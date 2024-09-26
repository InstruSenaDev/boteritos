//primera vista cuando se presiona olvide mi contraseña, desde aqui se envia el correo

import { useState } from "react";
import { Boton } from "../../components/forms/Boton";
import { Input } from "../../components/forms/Input.jsx";
import { Link } from "react-router-dom";

export const PasswordHelp = () => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setDocumentNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Número de documento:", documentNumber);
    setIsSubmitted(true);
  };

  const handleResend = () => {
    console.log("Reenviando enlace...");
  };

  const handleCorrect = () => {
    setDocumentNumber(""); // Limpia el input
    setIsSubmitted(false);  // Vuelve a mostrar el formulario
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
                />
                <Boton text="Continuar" type="blue" />
              </>
            ) : (
              <div className="text-center">
                <h1 className="text-title font-cocogooseRegular tracking-normal text-darkBlue">
                  Se envió un enlace a tu correo para que restablezcas tu contraseña.
                </h1>
                <p className="text-paragraph font-cocogooseLight">
                  Puedes cerrar esta página y reanudar la recuperación de tu cuenta desde el enlace.
                </p>
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
      </main>
   
  );
};

export default PasswordHelp;
