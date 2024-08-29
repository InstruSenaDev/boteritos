
import {Boton} from "../../components/forms/Boton.jsx";
import {Input} from "../../components/forms/Input.jsx";
import {ForgotLayout} from "../../layouts/ForgotLayout.jsx"


export const PassworHelp = () =>{
  return(
<ForgotLayout title="¿Olvidó su contraseña?" titulo="Recuperar contraseña">
  
  <Input
  texto="Numero de documento"
  placeholder="Ingresa tu documento"
  slot="inputs"
/>

  <Boton text="Continuar" type="blue" slot="boton"/>

  <img
    src="../../../public/img/Forgotimg.png"
    alt=""
    className="object-contain w-full h-full"
    slot="imagen"
  />

    <a href=""slot="return" className="text-paragraph2 font-cocogooseLight text-darkBlue underline-offset-2">Volver al inicio de sesión</a>
</ForgotLayout>
  )
}
