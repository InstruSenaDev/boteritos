import React, { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Loading from "./components/loaders/loading.jsx";

const Admin = lazy(() => import("./pages/admin/Admin.jsx"));
const FormLogin = lazy(() => import("./sections/FormLogin.jsx"));
const Addres = lazy(() => import("./pages/admin/Addres.jsx"));
const Dates = lazy(() => import("./pages/admin/Dates.jsx"));
const MedicalInfo = lazy(() => import("./pages/admin/MedicalInfo.jsx"));
const DatosEstudiante = lazy(() => import("./pages/admin/DatosEstudiante.jsx"));
const ListEstudiantes = lazy(() => import("./pages/admin/ListEstudents.jsx"));
const Registro = lazy(() => import("./pages/admin/Registro.jsx"));
const AdminMain = lazy(() => import("./pages/admin/AdminMain.jsx"));
const DateRangePickerHero = lazy(()=> import("./prueba.jsx"));
const Calificar = lazy(()=> import("./pages/profesor/Calificar.jsx"))

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <FormLogin /> },
      { path: "registro/admin/address", element: <Addres /> },
      { path: "registro/admin/dates", element: <Dates /> },
      { path: "registro/admin/medicalinfo", element: <MedicalInfo /> },
      { path: "datoestudiante/:id", element: <DatosEstudiante /> },
      { path: "listaestudiantes", element: <ListEstudiantes /> },
      { path: "registro", element: <Registro /> },
      { path: "registro/admin", element: <Admin /> },
      { path: "calificar/:id", element: <Calificar/>},
    ],
  },
  {
    path: "admin",
    element: <App />,
    children : [
      {path : '' , element :<AdminMain />},
      { path: 'prueba' , element : <DateRangePickerHero />}
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
