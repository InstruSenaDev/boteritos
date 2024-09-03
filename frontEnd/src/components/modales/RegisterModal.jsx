import React, { useState } from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { modales } from "../../helper/validators/modales";
import { postUserStudent } from "../../api/post"; // Asegúrate de tener esta función en el archivo adecuado
export function RegisterModal({
  txtmodal,
  cols,
  children,
  isOpen,
  onClose,
  values,
  onSubmit,
  isConfirm,
  selectedContent,  // Añade selectedContent a las props
}) {
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [errors, setErrors] = useState({}); // Para mostrar errores

  // Maneja el envío del formulario
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Validación
    const newErrors = {};
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = modales(selectedContent, key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Prepara los datos para enviar
    const dataUser = {
      telefono: {
        telefono: values.telefono?.trim() ?? "",
        telefonodos: values.telefonodos?.trim() ?? "",
      },
      responsable: {
        nombre: values.nombre?.trim() ?? "",
        documento: values.documento?.trim() ?? "",
        ndocumento: values.ndocumento?.trim() ?? "",
        telefono: values.telefono?.trim() ?? "",
        telefonodos: values.telefonodos?.trim() ?? "",
        direccion: values.direccion?.trim() ?? "",
        empresa: values.empresa?.trim() ?? "",
        parentesco: values.parentesco?.trim() ?? "",
      },
      condicionMedica: {
        parentesco: values.parentesco?.trim() ?? "",
        lugaratencion: values.lugaratencion?.trim() ?? "",
        rh: values.rh?.trim() ?? "",
        estatura: values.estatura?.trim() ?? "",
        peso: values.peso?.trim() ?? "",
      },
      historiaClinica: {
        diagnostico: values.diagnostico?.trim() ?? "",
        restricciones: values.restricciones?.trim() ?? "",
        medicamentos: values.medicamentos?.trim() ?? "",
      }
    };
  
    try {
      setLoading(true);
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }
  
      const result = await response.json();
      console.log('Datos enviados exitosamente:', result);
  
      // Maneja la respuesta del servidor si es necesario
      setIsConfirm(true); // Cambia al estado de confirmación
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setErrors({ global: 'Error al enviar los datos. Inténtelo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <form
        onSubmit={handleFormSubmit}
        className="w-full flex items-center justify-center"
      >
        <DialogPanel
          className={`flex flex-col gap-8 items-center lg:items-start ${
            cols === 1 ? "w-full" : "max-w-[800px] w-full"
          } py-[40px] px-[30px]`}
        >
          <div
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full text-gray bg-white hover:bg-slate-200 hover:text-slate-500"
          >
            <i className="fa-solid fa-x"></i>
          </div>

          {!isConfirm ? (
            <>
              <div
                className={`w-full text-title text-darkBlue text-center ${
                  cols === 1 ? "text-center" : "text-start"
                }`}
              >
                <h1>{txtmodal}</h1>
              </div>

              <div
                className={`w-full grid grid-cols-1 lg:grid-cols-${cols} lg:gap-x-[30px] gap-y-[20px] place-items-center text-justify`}
              >
                {children}
              </div>

              <div className="flex justify-center w-full mt-4">
                <Button className="max-w-[400px] w-full" type="submit" disabled={loading}>
                  {loading ? "Cargando..." : "Agregar"}
                </Button>
              </div>

              {/* Mostrar errores */}
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500 mt-4">
                  {errors.global && <p>{errors.global}</p>}
                  {Object.values(errors).map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-full h-full flex items-center justify-center flex-col gap-10">
                <img src="../../../public/img/zG59fyltWB.gif" alt="Success" />
                <div className="font-cocogooseRegular text-darkBlue text-title">
                  <h1>Datos registrados con éxito</h1>
                </div>
                <Button
                  className="max-w-[400px] w-full"
                  type="button"
                  onClick={onClose}
                >
                  Cerrar
                </Button>
              </div>
            </>
          )}
        </DialogPanel>
      </form>
    </Dialog>
  );
}

