
import './App.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const types = [
  { title: "Tech", keyword: "18" },
  { title: "General", keyword: "9" },
  { title: "History", keyword: "23" },
  { title: "Math", keyword: "19" },
  { title: "Celebrities", keyword: "26" },
  { title: "Geography", keyword: "22" },

]

function App() {
  const [selected, setSelected] = useState({ title: "Tech", keyword: "18" })
  return (
    <>
      <main className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2 group'>
          <div>
            <h3 className='text-gray-400'>Created by <a className='hover:underline underline-offset-4' href="https://www.strikedev.me">Strike</a> • A React Vite App.</h3>
            <h1 className='text-5xl font-medium'>Welcome to {selected.title} Trivia</h1>
          </div>
          <h2 className='text-xl'>Answer  Questions and Brag about Your Score!</h2>
        </div>
        <fieldset class="flex items-center justify-center flex-wrap gap-3">
          <legend class="sr-only">Color</legend>
          {types.map((object) => (
            <div key={object.keyword}>
              <input
                type="radio"
                name="ColorOption"
                value="ColorRed"
                id="ColorRed"
                class="peer hidden"
              />

              <label
                htmlFor="ColorRed"
                onClick={() => setSelected(object)}
                class={"flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200" + (selected.keyword === object.keyword ? " border-blue-500 bg-blue-500 text-white" : "")}
              >
                <p class="text-sm font-medium">{object.title}</p>
              </label>
            </div>
          ))}


        </fieldset>
        <Link to={'/trivia/' + selected.keyword} className='text-lg w-fit mx-auto button'>Start Answering! 👆</Link>
      </main>
    </>
  )
}

export default App
