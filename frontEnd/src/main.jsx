import React, { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Loading from "./components/loaders/loading.jsx";
//ADMINISTRADOR
const Admin = lazy(() => import("./pages/admin/Admin.jsx"));
const FormLogin = lazy(() => import("./sections/FormLogin.jsx"));
const Addres = lazy(() => import("./pages/admin/Addres.jsx"));
const Dates = lazy(() => import("./pages/admin/Dates.jsx"));
const MedicalInfo = lazy(() => import("./pages/admin/MedicalInfo.jsx"));
const PhoneNumber = lazy(() => import("./pages/admin/PhoneNumber.jsx"))
const DatosEstudiante = lazy(() => import("./pages/admin/DatosEstudiante.jsx"));
const ListEstudiantes = lazy(() => import("./pages/admin/ListEstudents.jsx"));
const Registro = lazy(() => import("./pages/admin/Registro.jsx"));
const AdminMain = lazy(() => import("./pages/admin/AdminMain.jsx"));
//PROFESOR
const Calificar = lazy(() => import("./pages/profesor/Calificar.jsx"));
const CrearLogros = lazy(() => import("./pages/profesor/CrearLogros.jsx"));
const ListEstudents = lazy(() => import("./pages/profesor/ListStudents.jsx"));
//ESTUDIANTE

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
    children : [
      {path : '' , element :<AdminMain />},
      { path: "registro", element: <Registro /> },
      { path: "registro/registroadmin", element: <Admin /> },
      { path: "registro/registroadmin/direcciones", element: <Addres /> },
      { path: "registro/registroadmin/fechas", element: <Dates /> },
      { path: "registro/registroadmin/datosmedicos", element: <MedicalInfo /> },
      { path: "registro/registroadmin/telefonos", element: <PhoneNumber/> },
      { path: "listaestudiantes", element: <ListEstudiantes /> },
      { path: "datoestudiante/:id", element: <DatosEstudiante /> },
    ]
  },
  {
    path: "profesor",
    element: <App />,
    children : [
      {path : '' , element :""},
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
