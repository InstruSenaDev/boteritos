import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Admin } from './pages/admin/Admin.jsx'
import { Addres } from './pages/admin/Addres.jsx'
import { Dates } from './pages/admin/Dates.jsx'
import { MedicalInfo } from './pages/admin/MedicalInfo.jsx'
import { FormLogin } from './sections/FormLogin.jsx'
import { DatosEstudiante } from './pages/admin/DatosEstudiante.jsx'
import { ListEstudiantes } from './pages/admin/ListEstudents.jsx'
import { Registro } from './pages/admin/Registro.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '', element: <App />, children: [
      {path: '', element: <FormLogin />},
      {path: 'registro/admin/address', element: <Addres />},
      {path: 'registro/admin/dates', element: <Dates />},
      {path: 'registro/admin/medicalinfo', element: <MedicalInfo/>},
      {path: 'datoestudiante/:id', element: <DatosEstudiante />},
      {path: 'listaestudiantes', element: <ListEstudiantes/>},
      {path: 'registro', element: <Registro/>},
      {path: 'registro/admin', element: <Admin/>}

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
