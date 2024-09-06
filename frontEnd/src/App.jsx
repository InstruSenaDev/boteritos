import { DatosEstudiante } from "./pages/admin/DatosEstudiante";
import { DateRangePickerHero } from "./prueba";
import { Notificaciones } from "./pages/admin/Notificaciones";
import { Index } from "./pages/admin/Index";
import { Informe } from "./pages/admin/Informe";
import { Registro } from "./pages/admin/Registro";
import { Calificar } from "./pages/profesor/Calificar";
import { CrearLogros } from "./pages/profesor/CrearLogros";
import { ListStudents } from "./pages/profesor/ListStudents";
import { PassworHelp } from "./pages/general/PasswordHelp";
import { ForgotPassword } from "./pages/general/ForgotPassword";
import { CambiarContrasena } from "./pages/general/CambiarContrasena";
import { FormLogin } from "./sections/FormLogin";
import { Profile } from "./pages/general/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { ListEstudiantes } from "./pages/admin/ListEstudents";
import { MultiStepRegister } from "./pages/admin/MultiStepRegister"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/datoestudiante/:id" element={<DatosEstudiante />} />
          <Route path="/listestudents" element={<ListEstudiantes/>}/>
          <Route path="/MultiStepRegister" element={<MultiStepRegister/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
