import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/datoestudiante/:id" element={<DatosEstudiante />} />
          <Route path="/listestudents" element={<ListEstudiantes/>}/>
          <Route path="/registro" element={<Registro/>} />
          <Route path="/registro/admin" element={<Admin/>}/>
          <Route path="/calificar/profesor" element={<Calificar/>}/>
          <Route path="/crearlogro/profesor" element={<CrearLogros/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
