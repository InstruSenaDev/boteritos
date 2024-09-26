import { useState } from "react";

import { Boton } from "../../components/forms/Boton";
import { Input } from "../../components/forms/Input.jsx";
import { Link } from "react-router-dom";
import { Button } from "@tremor/react";

export const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Número de documento:", );
    setIsSubmitted(true);
  };

  return (
   
      <main className="w-full h-screen flex justify-center items-center p-4 text-black">
        <form
          onSubmit={handleSubmit}
          className="bg-white md:p-20 p-7 flex gap-20 rounded-xl shadow-[0_0_20px_0px_rgba(94,175,232,0.5)]"
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
                  nueva contraseña
                </h1>
                <Input
                  texto="Nueva contraseña"
                  placeholder="Ingresa tu Nueva contraseña"
                  icon=""
                 
                />
                <Input
                  texto="Confirmar contraseña"
                  placeholder="Confirma tu nueva contraseña"
                  icon=""
                 
                />
                <Boton text="Cambiar contraseña" type="blue" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col gap-10">
              <img src="../../../public/img/zG59fyltWB.gif" alt=""></img>
              <div className="font-cocogooseRegular text-darkBlue text-title text-center">
                <h1>Contraseña cambiada con éxito</h1>
              </div>
              <Button
                className="max-w-[400px] w-full"
                type="submit"
               
              >
                Iniciar sesión 
              </Button>
            </div>
            )}
           
          </div>
        </form>
      </main>

  );
};

export default ForgotPassword;
