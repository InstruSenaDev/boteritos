import React, { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import RegFormLayout from "./hooks/ContextLayout.jsx";

import "./index.css";
import App from "./App.jsx";
import Loading from "./components/loaders/loading.jsx";
//ADMINISTRADOR
const Admin = lazy(() => import("./pages/admin/AdminRegister/AdminRegister.jsx"));
const FormLogin = lazy(() => import("./sections/FormLogin.jsx"));
//REGISTRO DE ADMINISTRADORES
const Registro = lazy(() => import("./pages/admin/Registro.jsx"));
const Addres = lazy(() => import("./pages/admin/AdminRegister/Addres.jsx"));
const Dates = lazy(() => import("./pages/admin/AdminRegister/Dates.jsx"));
const MedicalInfo = lazy(() => import("./pages/admin/AdminRegister/MedicalInfo.jsx"));
const PhoneNumber = lazy(() => import("./pages/admin/AdminRegister/PhoneNumber.jsx"));
//REGISTRO DE PROFESORES
const TeacherRegister = lazy(() => import("./pages/admin/TeacherRegister/TeacherRegister.jsx"));
const ProfessionTeacher = lazy(() => import("./pages/admin/TeacherRegister/ProfessionTeacher.jsx"));
const AddressTeacher = lazy(() => import("./pages/admin/TeacherRegister/Addres.jsx"));
const DatesTeacher = lazy(() => import("./pages/admin/TeacherRegister/Dates.jsx"));
const MedicalInfoTeacher = lazy(() => import("./pages/admin/TeacherRegister/MedicalInfo.jsx"));
const PhoneNumberTeacher = lazy(() => import("./pages/admin/TeacherRegister/PhoneNumber.jsx"));

const DatosEstudiante = lazy(() => import("./pages/admin/DatosEstudiante.jsx"));
const ListEstudiantes = lazy(() => import("./pages/admin/ListEstudents.jsx"));
const AdminMain = lazy(() => import("./pages/admin/AdminMain.jsx"));
//PROFESOR
const Calificar = lazy(() => import("./pages/profesor/Calificar.jsx"));
const CrearLogros = lazy(() => import("./pages/profesor/CrearLogros.jsx"));
const ListEstudents = lazy(() => import("./pages/profesor/ListStudents.jsx"));
//ESTUDIANTE
const StudentRegister = lazy(() => import("./pages/admin/StudenRegister/StudentRegister.jsx"));
const AddressStudent = lazy(() => import("./pages/admin/StudenRegister/Addres.jsx"));
const DatesStudent = lazy(() => import("./pages/admin/StudenRegister/Dates.jsx"));
const MedicalInfoStudent = lazy(() => import("./pages/admin/StudenRegister/MedicalInfo.jsx"));
const PhoneNumberStudent = lazy(() => import("./pages/admin/StudenRegister/PhoneNumber.jsx"));

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
      { path: "registro", element: <Registro /> },
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

      { path: "listaestudiantes", element: <ListEstudiantes /> },
      { path: "listaestudiantes/datoestudiante/:id", element: <DatosEstudiante /> },
    ]
  },
  {
    path: "profesor",
    element: <App />,
    children: [
      { path: '', element: "" },
      { path: "calificarestudiante", element: <Calificar /> },
      { path: "crearlogro", element: <CrearLogros /> },
      { path: "listaestudiantes", element: <ListEstudents /> },
    ]
  },

]);

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Suspense>
);
