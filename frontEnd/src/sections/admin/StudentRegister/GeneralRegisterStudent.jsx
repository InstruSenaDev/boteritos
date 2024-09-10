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
import { useNavigate, Link } from "react-router-dom";
import { useRegFormContext } from "../../../hooks/RegFormProvider.jsx";
import { caseEstudiante } from "../../../helper/validators/case/estudiante.js";

export const GeneralRegisterStudent = () => {
    const [state, dispatch] = useRegFormContext();
    
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
        tallacamisa: "",
        institutoprocedencia: "",
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

        // Validar el campo específico
        const error = caseEstudiante(name, value);

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
        dispatch({type:'SET_STUDENT_DATA', data: values})

        // Validar todos los campos antes de enviar
        const newErrors = {};
        for (const key in values) {
            if (Object.hasOwn(values, key)) {
                const error = caseEstudiante(key, values[key]);
                if (error) {
                    newErrors[key] = error;
                }
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const dataUser = {
            ...values,
            nombre: `${values.nombre.trim()} ${values.apellido.trim()}`,
            numerodocumento: values.numerodocumento.trim(),
            tallacamisa: values.tallacamisa.trim(),
            institutoprocedencia: values.institutoprocedencia.trim(),
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
        navigate('/admin/registro/registroestudiante/direcciones')

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
                        error={errors.nombre}
                    />
                    <Input
                        name={"tallacamisa"}
                        texto={"Talla de camisa"}
                        placeholder={"Talla de camisa del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.tallacamisa}
                        error={errors.tallacamisa}
                    />
                    <Input
                        name={"institutoprocedencia"}
                        texto={"Instituto de procedencia"}
                        placeholder={"Instituto de procedencia del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.institutoprocedencia}
                        error={errors.institutoprocedencia}
                    />
                    <Input
                        name={"apellido"}
                        texto={"Apellidos"}
                        placeholder={"Apellido del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.apellido}
                        error={errors.apellido}
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
                        error={errors.idtipodocumento}
                    />
                    <Input
                        name={"numerodocumento"}
                        texto={"Número de documento"}
                        placeholder={"Documento del usuario"}
                        tipo={"number"}
                        onChange={handleInputChange}
                        value={values.numerodocumento}
                        error={errors.numerodocumento}
                    />
                    <Input
                        name={"edad"}
                        texto={"Edad"}
                        placeholder={"Edad del usuario"}
                        tipo={"text"}
                        onChange={handleInputChange}
                        value={values.edad}
                        error={errors.edad}
                    />
                    <Input
                        name={"correo"}
                        texto={"Correo"}
                        placeholder={"Correo electrónico del usuario"}
                        tipo={"email"}
                        onChange={handleInputChange}
                        value={values.correo}
                        error={errors.correo}
                    />
                    {/* Dropdown para seleccionar el sexo */}
                    <Dropdown
                        name={"idsexo"}
                        label={"Sexo"}
                        //data={dataMatricula}
                        data={dataDropdown.dropdownSexo}
                        onChange={(value) => handleDropdownChange("idsexo", value)}
                        placeholder={"Selecciona el sexo"}
                        error={errors.idsexo}
                    />
                    <UploadFile
                        title={"Foto"}
                        id="foto"
                        onFileChange={(file) => handleFileChange("foto", file)}
                    />
                </div>
                <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
                    {/* Botón para confirmar el formulario */}
                    <Link to={"/admin/registro"} className="max-w-[400px] w-full">
                        <Boton text="Atras" type="blue" />
                    </Link>
                    <Boton text="Confirmar" type="blue" />

                </div>
            </form>
        </>
    );
};
