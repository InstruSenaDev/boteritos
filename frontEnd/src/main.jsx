import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Admin } from './pages/admin/Admin.jsx'
import { Addres } from './pages/admin/Addres.jsx'
import { Dates } from './pages/admin/Dates.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '', element: <App />, children: [
      {path: '', element: <Admin />},
      {path: 'address', element: <Addres />},
      {path: 'dates', element: <Dates />}
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
