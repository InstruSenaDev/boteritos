//primera vista cuando se presiona olvide mi contraseña, desde aqui se envia el correo

import { useState } from "react";
import { Boton } from "../../components/forms/Boton";
import { Input } from "../../components/forms/Input.jsx";
import { Link } from "react-router-dom";
import { putRecuperarPwd } from "../../api/put.js";
import { LoadingModal } from "../../components/modales/LoadingModal.jsx";

export const PasswordHelp = () => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [correoEncriptado, setCorreoEncriptado]= useState("")
  const [successMessage, setSuccessMessage] = useState(""); 


  
  const handleChange = (e) => {
    setDocumentNumber(e.target.value);
    if (errorMessage) {
      setErrorMessage(""); // Limpia el mensaje de error al escribir
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentNumber) {
      setErrorMessage("Debes ingresar tu número de documento.");
      return;
    }
   
const body = JSON.stringify({documento: documentNumber});

try {
  setIsLoading(true);
  const response = await putRecuperarPwd(body, "correo/recuperar/")

  const data = await response.json();

  if (response.status === 200) {
    setIsSubmitted(true);
    console.log("correo",data);
    
    setCorreoEncriptado(data.data.correo); // Almacena el correo encriptado recibido
  } else {
    // Si no hay una cuenta vinculada, muestra un mensaje de error
    setErrorMessage("No hay cuentas vinculadas con ese número de documento.");
  }

} catch (error) {
   // En caso de fallo en la solicitud
   setErrorMessage("Hubo un problema al enviar el correo. Intenta de nuevo más tarde");
}finally{
    // Cerrar el modal de carga cuando se complete la descarga
    setIsLoading(false);
}

  };

  const handleResend = async () => {
    const body = JSON.stringify({ documento: documentNumber });

    try {
      setIsLoading(true);
      const response = await putRecuperarPwd(body, "correo/recuperar/");
      const data = await response.json();

      if (response.status === 200) {
        setCorreoEncriptado(data.data.correo); // Almacena el correo encriptado recibido
        setSuccessMessage("El enlace de recuperación ha sido reenviado a tu correo."); // Establece el mensaje de éxito
      } else {
        setErrorMessage("Hubo un problema al enviar el correo. Intenta de nuevo más tarde.");
      }
    } catch (error) {
      setErrorMessage("Hubo un problema al enviar el correo. Intenta de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCorrect = () => {
    setDocumentNumber(""); // Limpia el input
    setIsSubmitted(false); // Vuelve a mostrar el formulario
    setErrorMessage(""); // Limpia los errores
    setCorreoEncriptado(""); // Limpia el correo encriptado
    setSuccessMessage(""); // Limpia el mensaje de éxito
  };

  return (

      <main className="w-full h-screen flex justify-center items-center p-4 text-black">
        <form
          onSubmit={handleSubmit}
          className=" md:p-20 p-7 flex gap-20 rounded-xl shadow-[0_0_20px_0px_rgba(94,175,232,0.5)]"
        >
          <div className="max-h-96 max-w-[520px] w-full md:block hidden">
            <img
              src="../../../public/img/Forgotimg.png"
              alt="Forgot password"
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-7 max-w-[400px] w-full order-3 justify-center">
            {!isSubmitted ? (
              <>
                <h1 className="text-title font-cocogooseRegular tracking-normal text-darkBlue">
                  Recuperar contraseña
                </h1>
                <Input
                  texto="Número de documento"
                  placeholder="Ingresa tu documento"
                  icon=""
                  value={documentNumber}
                  onChange={handleChange}
                  error={errorMessage}
                />
                <Boton text="Continuar" type="blue" />
              </>
            ) : (
              <div className="text-center">
                <h1 className="text-title font-cocogooseRegular tracking-normal text-darkBlue break-words">
                  Se envió un enlace al correo, {correoEncriptado}, con el cúal podras recuperar tu contraseña.
                </h1>
                <p className="text-paragraph font-cocogooseLight">
                  Puedes cerrar esta página y reanudar la recuperación de tu cuenta desde el enlace.
                </p>
                {successMessage && (
                <p className="mt-2 text-green-500">{successMessage}</p> // Mensaje de éxito
              )}
                <div className="flex justify-center mt-4">
                  <Boton text="Reenviar enlace" type="blue" onClick={handleResend} />
                </div>
                
                <div className="flex justify-center mt-4">
                    <a 
                      href="#" 
                      className="text-paragraph2 font-cocogooseLight text-darkBlue underline" 
                      onClick={handleCorrect}
                    >
                      Corregir documento
                    </a>
                 
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <Link to="/" className="text-paragraph2 font-cocogooseLight text-darkBlue underline">
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </form>
        <LoadingModal isOpen={isLoading} onClose={() => {}} />
      </main>
   
  );
};

export default PasswordHelp;
