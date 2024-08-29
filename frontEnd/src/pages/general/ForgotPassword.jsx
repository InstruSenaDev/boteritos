
import {Boton} from "../../components/forms/Boton";
import {Input} from "../../components/forms/Input.jsx";
import {ForgotLayout} from "../../layouts/ForgotLayout.jsx";
import {ShowPassword} from "../../components/forms/ShowPassword";

export const ForgotPassword = () =>{
  return(
<ForgotLayout title="¿Olvidó su contraseña?" titulo="Recuperar contraseña">
  <Input
  texto="Nueva contraseña"
  placeholder="Ingresa tu nueva contraseña"
  icon=""
  slot="inputs"
/>
  <Input
  texto="Numero de documento"
  placeholder="Ingresa tu documento"
  icon=""
  slot="inputs"
  />

  <ShowPassword slot="footer"/>


  <Boton text="Iniciar Sesión" type="blue" slot="boton"/>
  <img
    src="../../../public/img/Forgotimg.png"
    alt="Forgot password"
    class="object-contain w-full h-full"
    slot="imagen"
  />
  <a href="" slot="return" class="text-paragraph2 font-cocogooseLight text-darkBlue">Volver al inicio de sesión</a>
</ForgotLayout>
  )
}
