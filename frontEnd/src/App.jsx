import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { DateRangePickerHero } from './prueba'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DateRangePickerHero/>
    </>
  )
}

export default App
