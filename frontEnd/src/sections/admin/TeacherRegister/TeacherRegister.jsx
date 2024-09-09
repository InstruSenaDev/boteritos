import React, { useEffect, useState } from "react";
import { Dropdown } from "../../../components/forms/Dropdown.jsx";
import { Input } from "../../../components/forms/Input.jsx";
import { UploadFile } from "../../../components/forms/UploadFile.jsx";
import {
    dataDoc,
    dataSexo,
    dataArea
} from "../../../helper/objects/dropdownArray.js";
import { Boton } from "../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../api/post.js";
import { validateField } from "../../../helper/validators/register.js";
import { useNavigate, Link } from "react-router-dom";
import { useRegFormContext } from "../../../hooks/RegFormProvider.jsx";

export const TeacherRegister = () => {
    const [, dispatch] = useRegFormContext();

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch({type: 'CHANGE_PERCENT', data: 100})
      }, [])

    const [errors, setErrors] = useState({}); // Estado para los errores

    const [selectedRole, setSelectedRole] = useState("");

    const [isRegistering, setIsRegistering] = useState(false);

    const [dataDropdown, setDataDropdown] = useState({
        dropdownArea: [],
    });

    const [values, setValues] = useState({
        titulo: "",
        idArea: "N/A",
        hojaDeVida: null,
    });

    //PASAR DATOS A LOS DROPDOWNS (DATOS DE LA DB)
    useEffect(() => {
        const getDataDropdown = async () => {
            const resultSexo = await dataSexo();
            const resultDocumento = await dataDoc();
            const resultArea = await dataArea();

            console.log(resultSexo);
            console.log(resultDocumento);

            setDataDropdown({
                ...dataDropdown,
                dropdownSexo: resultSexo,
                dropdownDocumento: resultDocumento,
                dropdownArea: resultArea,
            });
        };

        getDataDropdown();
    }, []);

    // Maneja cambios en los inputs de texto
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const error = validateField(name, value); // Validar el campo específico

        setErrors({
            ...errors,
            [name]: error,
        }); // Actualizar el estado de errores y valores

        setValues({
            ...values,
            [name]: value,
        });
    };


    // Función genérica para manejar cambios en otros dropdowns
    const handleDropdownChange = (name, value) => {
        setValues({ ...values, [name]: value });
        console.log("dropdowns value:", value); // Mostrar el valor seleccionado de los otros dropdowns en la consola
    };


    // Maneja el envío del formulario
    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'SET_PROFESSION_DATA', data: values })

        //const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
        // for (const key in values) {
        //     if (Object.hasOwn(values, key)) {
        //         const error = validateField(key, values[key]);
        //         if (error) {
        //             newErrors[key] = error;
        //         }
        //     }
        // }

        // if (Object.keys(newErrors).length > 0) {
        //     // Si hay errores, no enviar el formulario
        //     setErrors(newErrors);

        //     return;
        // }

        const dataUser = {
            ...values,
            nombre: `${values.nombre.trim()} ${values.apellido.trim()}`,
        };
        console.log(dataUser);

        //let formData = new FormData();

        /*Object.entries(dataUser).forEach(([key, value]) => {
          formData.append([key] , value)
          
        });
    
        console.log(formData);*/
        

        // createUser(dataUser);
    };

    const createUser = async (data) => {
        const response = await postUserStudent(data, "usuarios");
        console.log(response);

        if (response.status == 200 || response.status == 201) {
            setIsRegistering(true);
            console.log(
                "Nada de errores, aqui se debe redireccionar al registro con detalle"
            );
            return;
        }

        //Se presentaron errores (API):
        const dataError = await response.data.error;

        // const newErrors = {}; // Definir newErrors como un objeto vacío antes de usarlo
        // Object.entries(dataError).forEach(([key, value]) => {
        //     newErrors[key] = value[0];
        // });

        // if (Object.keys(newErrors).length > 0) {
        //     setErrors(newErrors);
        // }
    };

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
                    {/* Renderiza dropdowns adicionales según el rol seleccionado */}
                    <Input
                        name={"titulo"}
                        texto={"Titulo"}
                        placeholder={"Titulación del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.titulo}
                    //error={errors.nombre}
                    />
                    <Dropdown
                        name={"idarea"}
                        label={"Area"}
                        //data={dataMatricula}
                        data={dataDropdown.dropdownArea}
                        onChange={(value) => handleDropdownChange("idarea", value)}
                        placeholder={"Selecciona un area"}
                    //error={errors.idarea}
                    />
                    <UploadFile
                        title={"Hoja de vida"}
                        id="hojaDeVida"
                        onFileChange={(file) => handleFileChange("hojaDeVida", file)}
                    />
                </div>
                <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
                    {/* Botón para confirmar el formulario */}
                    <Boton text="Confirmar" type="blue" />

                    <Link to={"/admin/registro/registroprofesor/telefonos"} className="max-w-[400px] w-full">
                        <Boton text="Atras" type="blue" />
                    </Link>
                </div>
            </form>
        </>
    );
};
