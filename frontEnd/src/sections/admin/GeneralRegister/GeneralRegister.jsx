import React, { useEffect, useState } from "react";
import { Dropdown } from "../../../components/forms/Dropdown.jsx";
import { Input } from "../../../components/forms/Input.jsx";
import { UploadFile } from "../../../components/forms/UploadFile.jsx";
import {
    dataDoc,
    dataSexo,
} from "../../../helper/objects/dropdownArray.js";
import { Boton } from "../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../api/post.js";
import { validateField } from "../../../helper/validators/register.js";
import { useNavigate } from "react-router-dom";
import { useRegFormContext } from "../../../hooks/RegFormProvider.jsx";

export const GeneralRegister = () => {
    const [, dispatch] = useRegFormContext();
    
    const navigate = useNavigate();

    const [errors, setErrors] = useState({}); // Estado para los errores

    const [selectedRole, setSelectedRole] = useState("");

    const [isRegistering, setIsRegistering] = useState(false);

    const [dataDropdown, setDataDropdown] = useState({
        dropdownDocumento: [],
        dropdownSexo: [],
        dropdownArea: [],
        dropdownRol: [],
    });

    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        numerodocumento: "",
        correo: "",
        urlimg: "",
        edad: "",
        idtipodocumento: "",
        idsexo: "",
        contrasena: "",
        cambiocontrasena: "0",
        estado: "1",
        idsexo: "",
        token: "",
        refreshToken: ""
        //hojaDeVida: null,
    });

    //PASAR DATOS A LOS DROPDOWNS (DATOS DE LA DB)
    useEffect(() => {
        const getDataDropdown = async () => {
            const resultSexo = await dataSexo();
            const resultDocumento = await dataDoc();

            console.log(resultSexo);
            console.log(resultDocumento);

            setDataDropdown({
                ...dataDropdown,
                dropdownSexo: resultSexo,
                dropdownDocumento: resultDocumento,
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
        dispatch({type:'SET_COMMON_DATA', data: values})

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
            numerodocumento: values.numerodocumento.trim(),
            correo: values.correo.trim(),
            urlimg: `https://${values.urlimg}img.com`,
            edad: values.edad.trim(),
            contrasena: values.numerodocumento.trim(),
        };
        console.log(dataUser);

        //let formData = new FormData();

        /*Object.entries(dataUser).forEach(([key, value]) => {
          formData.append([key] , value)
          
        });
    
        console.log(formData);*/
        navigate('/registro/admin/address')

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
                        name={"nombre"}
                        texto={"Nombre"}
                        placeholder={"Nombre del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.nombre}
                        //error={errors.nombre}
                    />
                    <Input
                        name={"apellido"}
                        texto={"Apellidos"}
                        placeholder={"Apellido del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.apellido}
                        //error={errors.apellido}
                    />
                    {/* Dropdown para seleccionar el tipo de documento */}
                    <Dropdown
                        name={"idtipodocumento"}
                        label={"Tipo de documento"}
                        //data={dataMatricula}
                        data={dataDropdown.dropdownDocumento}
                        onChange={(value) =>
                            handleDropdownChange("idtipodocumento", value)
                        }
                        placeholder={"Selecciona el tipo de documento"}
                        //error={errors.idtipodocumento}
                    />
                    <Input
                        name={"numerodocumento"}
                        texto={"Número de documento"}
                        placeholder={"Documento del usuario"}
                        tipo={"number"}
                        onChange={handleInputChange}
                        value={values.numerodocumento}
                        //error={errors.numerodocumento}
                    />
                    <Input
                        name={"edad"}
                        texto={"Edad"}
                        placeholder={"Edad del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.edad}
                        //error={errors.edad}
                    />
                    <Input
                        name={"correo"}
                        texto={"Correo"}
                        placeholder={"Correo electrónico del usuario"}
                        tipo={"email"}
                        onChange={handleInputChange}
                        value={values.correo}
                        //error={errors.correo}
                    />
                    {/* Dropdown para seleccionar el sexo */}
                    <Dropdown
                        name={"idsexo"}
                        label={"Sexo"}
                        //data={dataMatricula}
                        data={dataDropdown.dropdownSexo}
                        onChange={(value) => handleDropdownChange("idsexo", value)}
                        placeholder={"Selecciona el sexo"}
                        //error={errors.idsexo}
                    />
                    <UploadFile
                        title={"Foto"}
                        id="foto"
                        onFileChange={(file) => handleFileChange("foto", file)}
                    />
                </div>
                <div className="w-full flex justify-center">
                    {/* Botón para confirmar el formulario */}
                    <Boton text="Confirmar" type="blue" />
                </div>
            </form>
        </>
    );
};
