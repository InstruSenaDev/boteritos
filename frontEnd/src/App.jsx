import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-darkBlue h-10 w-10'>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
    </>
  )
}

export default App
