import { useState } from "react";
import { Boton } from "../../components/forms/Boton";
import { Input } from "../../components/forms/Input.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { putRecuperarPwd } from "../../api/put.js"; 

export const ForgotPassword = () => {
  // Estado para controlar el tipo de contraseña (texto o password)
  const [typeContrasena, setTypeContrasena] = useState("password");
  // Obtiene el token desde la URL
  const { token } = useParams(); 
  // Estado para saber si la contraseña ha sido cambiada
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Estados para almacenar las nuevas contraseñas
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Para redirigir al usuario

  // Función para mostrar/ocultar la contraseña
  const vercontrasena = (event) => {
    const isCheck = event.target.checked;
    setTypeContrasena(isCheck ? "text" : "password"); // Cambia el tipo de input
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden"); // Mensaje de error
      return;
    }

    // Preparar los datos para la solicitud PUT
    const data = JSON.stringify({
      token: token, 
      contrasena: newPassword,
    });

    try {
      const response = await putRecuperarPwd(data, `correo/actualizar/`);
      const responseData = await response.json();

      // Manejar errores de token expirado
      if (response.status === 400 && responseData.error === "El token ha caducado") {
        setErrorMessage("El tiempo para restablecer la contraseña ha expirado. Por favor, haz una nueva solicitud.");
      } else if (response.ok) {
        setIsSubmitted(true); // Indica que la contraseña se ha cambiado con éxito
      } else {
        // Muestra un mensaje de error si falla el cambio de contraseña
        setErrorMessage(responseData.message || "Error al cambiar la contraseña. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      setErrorMessage("Ocurrió un error inesperado. Inténtalo más tarde."); // Mensaje de error genérico
    }
  };
  
  // Redirige al usuario a la página de inicio de sesión
  const handleLoginRedirect = () => {
    navigate("/"); 
  };

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value); // Actualiza el estado del valor del input
    setErrorMessage(""); // Borra el mensaje de error al escribir
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
                Nueva contraseña
              </h1>

              {/* Campo para nueva contraseña */}
              <Input
                texto="Nueva contraseña"
                placeholder="Ingrese nueva contraseña"
                icon=""
                tipo={typeContrasena}
                onChange={handleInputChange(setNewPassword)} // Actualiza el estado y borra el error
                value={newPassword}
                error={errorMessage} // Muestra el mensaje de error si existe
              />
              
              {/* Campo para confirmar contraseña */}
              <Input
                texto="Confirmar contraseña"
                placeholder="Confirme nueva contraseña"
                icon=""
                tipo={typeContrasena}
                onChange={handleInputChange(setConfirmPassword)} // Actualiza el estado y borra el error
                value={confirmPassword}
              />
              
              {/* Opción para mostrar/ocultar la contraseña */}
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="ver"
                  className="rounded-full"
                  onChange={vercontrasena} // Cambia el tipo de contraseña al hacer clic
                />
                <label
                  htmlFor="ver"
                  className="text-paragraph2 font-cocogooseLight"
                >
                  Ver contraseña
                </label>
              </div>

              {/* Botón para cambiar la contraseña */}
              <Boton text="Cambiar contraseña" type="blue" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-10">
              <img src="../../../public/img/zG59fyltWB.gif" alt=""></img>
              <div className="font-cocogooseRegular text-darkBlue text-title text-center">
                <h1>Contraseña cambiada con éxito</h1>
                <p className="text-paragraph2 font-cocogooseLight text-black">
                  Su contraseña se cambió éxitosamente, presione el botón de abajo e inicie sesión con su nueva contraseña.
                </p>
              </div>
              {/* Botón para redirigir al inicio de sesión */}
              <Boton text="Iniciar sesión" type="blue" onClick={handleLoginRedirect} />
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default ForgotPassword;
