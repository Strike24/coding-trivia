import { list } from "postcss";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export default function Trivia() {
    const [question, setQuestion] = useState("Loading Question...")
    const [incorrectAnswers, setIncorrectAnswers] = useState(["Loading Answer...", "Loading Answer...", "Loading Answer..."])
    const [answer, setAnswer] = useState("Loading Answer...")
    const [type, setType] = useState("")
    const [score, setScore] = useState(parseInt(localStorage.getItem("score")) || 0)
    const [allAnswers, setAllAnswers] = useState([])

    async function getCodingQuestion() {
        let difficulty = "easy";
        if (score >= 20) difficulty = "hard"
        else if (score >= 10) difficulty = "medium";
        const listOfAnswers = document.getElementById("answers")
        listOfAnswers.childNodes.forEach(child => {
            child.className = 'text-lg px-10 mx-auto button'
        })

        fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&category=18`)
            .then(res => res.json())
            .then((data) => {
                setQuestion(data.results[0].question);
                setIncorrectAnswers(data.results[0].incorrect_answers)
                setAnswer(data.results[0].correct_answer)
                setType(difficulty)
                const tempArray = [...data.results[0].incorrect_answers, data.results[0].correct_answer]
                shuffleArray(tempArray)
                setAllAnswers(tempArray)
            })
    }

    useEffect(() => {
        localStorage.setItem("score", score);
        if (score < 0) setScore(0)
    }, [score])

    function clickedButton(event) {
        const listOfAnswers = document.getElementById("answers")
        if (event.target.id === answer && !event.target.className.includes("used")) {
            setScore(score + 1);

            toast('You Are Right! 🎊 Good Job, Next Question!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "light",
            });
        } else if (event.target.id !== answer && !event.target.className.includes("used")) {
            toast.error('Wrong Answer! Try Harder 😭', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
        }

        listOfAnswers.childNodes.forEach(child => {
            if (child.className.includes("used")) return;
            child.className += " used"
            if (child.id === answer) {
                child.className += " answer";
            }
            else {
                child.className += " wrong"
            }
        })

        setTimeout(getCodingQuestion, 2 * 1000)
    }

    function skipQuestion() {
        if (score > 0) {
            toast.error('1 point has been removed from your score.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });

            setScore(score - 1);
            getCodingQuestion()
        } else {
            toast.error('You must have points in order to skip.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
        }
    }



    useEffect(() => {
        getCodingQuestion();
    }, [])

    return (
        <>
            <h3 className='text-gray-400 absolute left-3 top-3'>Created by <a className='hover:underline underline-offset-4' href="https://www.strikedev.me">Strike</a></h3>
            <div className="absolute right-3 top-3">
                <h3 className='text-gray-400 text-3xl'>{score}</h3>
                <button onClick={() => setScore(0)}>❗Reset</button>
            </div>
            <main className='flex flex-col gap-10'>
                <div className="flex gap-10 flex-col border-b-4 border-gray-300 pb-10">
                    <div className='flex flex-col  group'>
                        <div>
                            <h1 dangerouslySetInnerHTML={{ __html: question }} className='text-3xl font-medium'></h1>
                        </div>
                        <h2 className='text-xl'>Difficulty: <span className={(type === "easy") ? "text-green-400" : (type === "medium") ? "text-orange-400" : "text-red-400"}>{type.toLocaleUpperCase()}</span></h2>
                    </div>
                    <div id="answers" className="flex flex-wrap gap-4">
                        {allAnswers.map(answer => (
                            <button onClick={clickedButton} id={answer} dangerouslySetInnerHTML={{ __html: answer }} className='text-lg px-10 mx-auto button'></button>
                        ))}
                    </div>
                </div>
                <div className="w-fit mx-auto flex flex-col gap-4">
                    <button onClick={() => skipQuestion()} className="button px-10">Skip ⏭️</button>
                    <a href="/" className="button !bg-red-600 px-10">Back to Home</a>

                </div>
            </main>
        </>
    )
}