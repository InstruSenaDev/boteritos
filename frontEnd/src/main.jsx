import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import RegFormLayout from "./hooks/ContextLayout.jsx";

import "./index.css";
import App from "./App.jsx";
import Loading from "./components/loaders/loading.jsx";
//ADMINISTRADOR
const Admin = lazy(() => import("./pages/admin/registro/AdminRegister/AdminRegister.jsx"));
const FormLogin = lazy(() => import("./sections/FormLogin.jsx"));
const DatosEstudiante = lazy(() => import("./pages/admin/estudiantes/DatosEstudiante.jsx"));
const ListEstudiantes = lazy(() => import("./pages/admin/estudiantes/ListEstudents.jsx"));
const AdminMain = lazy(() => import("./pages/admin/AdminMain.jsx"));
const RecibirLogros = lazy(() => import("./pages/admin/RecibirLogros.jsx"));
const Informe = lazy(() => import("./pages/admin/Informe.jsx"));
const Trimestre = lazy (()=>import("./pages/admin/Trimestres.jsx"))
const ListTeachers = lazy(()=> import("./pages/admin/profesores/ListTeachers.jsx"))
//GENERAL
const Perfil = lazy(() => import("./pages/general/Profile.jsx"));
const PasswordHelp = lazy(() => import("./pages/general/PasswordHelp.jsx"));
const ForgotPassword = lazy(() => import("./pages/general/ForgotPassword.jsx"));
const ChangePassword = lazy(() => import("./pages/general/CambiarContrasena.jsx"));
//REGISTRO DE ADMINISTRADORES
const Registro = lazy(() => import("./pages/admin/registro/Registro.jsx"));
const Addres = lazy(() => import("./pages/admin/registro/AdminRegister/Addres.jsx"));
const Dates = lazy(() => import("./pages/admin/registro/AdminRegister/Dates.jsx"));
const MedicalInfo = lazy(() => import("./pages/admin/registro/AdminRegister/MedicalInfo.jsx"));
const PhoneNumber = lazy(() => import("./pages/admin/registro/AdminRegister/PhoneNumber.jsx"));
//REGISTRO DE PROFESORES
const TeacherRegister = lazy(() => import("./pages/admin/registro/TeacherRegister/TeacherRegister.jsx"));
const ProfessionTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/ProfessionTeacher.jsx"));
const AddressTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/Addres.jsx"));
const DatesTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/Dates.jsx"));
const MedicalInfoTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/MedicalInfo.jsx"));
const PhoneNumberTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/PhoneNumber.jsx"));
//REGISTRO DE ESTUDIANTE
const StudentRegister = lazy(() => import("./pages/admin/registro/StudenRegister/StudentRegister.jsx"));
const AddressStudent = lazy(() => import("./pages/admin/registro/StudenRegister/Addres.jsx"));
const DatesStudent = lazy(() => import("./pages/admin/registro/StudenRegister/Dates.jsx"));
const MedicalInfoStudent = lazy(() => import("./pages/admin/registro/StudenRegister/MedicalInfo.jsx"));
const PhoneNumberStudent = lazy(() => import("./pages/admin/registro/StudenRegister/PhoneNumber.jsx"));
//PROFESOR
const Calificar = lazy(() => import("./pages/profesor/Calificar.jsx"));
const CrearLogros = lazy(() => import("./pages/profesor/CrearLogros.jsx"));
const ListEstudents = lazy(() => import("./pages/profesor/ListStudents.jsx"));
const TeacherMain = lazy(() => import("./pages/profesor/index.jsx"));
//ESTUDIANTE
const StudentMain = lazy(() => import("./pages/estudiante/index.jsx"));


const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <FormLogin /> }
    ],
  },
  {
    path: "admin",
    element: <App />,
    children: [
      { path: '', element: <AdminMain /> },
      { path: "perfil", element: <Perfil/>},
      { path: "ayudacontrasena", element: <PasswordHelp/>},
      { path: "cambiarcontrasena", element: <ChangePassword/> },
      { path: "recuperarcontrasena", element: <ForgotPassword/> },
      { path: "registro", element: <Registro /> },
      { path: "listaestudiantes", element: <ListEstudiantes /> },
      { path: "listaestudiantes/datoestudiante/:id", element: <DatosEstudiante /> },
      { path: "logrosrecibidos", element: <RecibirLogros/> },
      { path: "informe", element: <Informe/> },
      { path: "creartrimestres", element:<Trimestre/>},
      { path: "listaprofesores", element:<ListTeachers/>},
      {
        path: "registro",
        element: <RegFormLayout />,
        children: [
          //RUTAS REGISTRO DE ADMIN
          { path: "registroadmin", element: <Admin /> },
          { path: "registroadmin/direcciones", element: <Addres /> },
          { path: "registroadmin/fechas", element: <Dates /> },
          { path: "registroadmin/datosmedicos", element: <MedicalInfo /> },
          { path: "registroadmin/telefonos", element: <PhoneNumber /> },
          //RUTAS REGISTRO DE ESTUDIANTE
          { path: "registroestudiante", element: <StudentRegister /> },
          { path: "registroestudiante/direcciones", element: <AddressStudent /> },
          { path: "registroestudiante/fechas", element: <DatesStudent /> },
          { path: "registroestudiante/datosmedicos", element: <MedicalInfoStudent /> },
          { path: "registroestudiante/telefonos", element: <PhoneNumberStudent /> },
          //RUTAS REGISTRO DE PROFESOR
          { path: "registroprofesor", element: <TeacherRegister /> },
          { path: "registroprofesor/direcciones", element: <AddressTeacher /> },
          { path: "registroprofesor/fechas", element: <DatesTeacher /> },
          { path: "registroprofesor/datosmedicos", element: <MedicalInfoTeacher /> },
          { path: "registroprofesor/telefonos", element: <PhoneNumberTeacher /> },
          { path: "registroprofesor/cargo", element: <ProfessionTeacher /> },
        ],
      },

    ]
  },
  {
    path: "profesor",
    element: <App />,
    children: [
      { path: '', element: <TeacherMain/> },
      { path: "calificarestudiante", element: <Calificar /> },
      { path: "crearlogro", element: <CrearLogros /> },
      { path: "listaestudiantes", element: <ListEstudents /> },
      { path: "perfil", element: <Perfil /> },
      { path: "ayudacontrasena", element: <PasswordHelp/>},
      { path: "recuperarcontrasena", element: <ForgotPassword/> },
      { path: "cambiarcontrasena", element: <ChangePassword/> },
    ]
  },
  {
    path: "estudiante",
    element: <App />,
    children: [
      { path: '', element: <StudentMain/> },
      { path: "perfil", element: <Perfil/>},
      { path: "ayudacontrasena", element: <PasswordHelp/>},
      { path: "recuperarcontrasena", element: <ForgotPassword/> },
      { path: "cambiarcontrasena", element: <ChangePassword/> },
    ]
  }

]);

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Suspense>
);
