
import './App.css'

function App() {

  return (
    <>
     <main className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2 group'>
          <div>
          <h3 className='text-gray-400'>Created by <a className='hover:underline underline-offset-4' href="https://www.strikedev.me">Strike</a> • A React Vite App.</h3>
          <h1 className='text-5xl font-medium'>Welcome to Tech Trivia 💻</h1>
          </div>
          <h2 className='text-xl'>Answer <span className='text-blue-400 group-hover:text-yellow-500 transition-all'>Tech</span> & <span className='text-red-400 group-hover:text-yellow-500 transition-all'>Coding</span> Questions and Brag about Your Score!</h2>
      </div>
      <a href='/trivia' className='text-lg w-fit mx-auto button'>Start Debugging! (Answering 😉)</a>
     </main>
    </>
  )
}

export default App
