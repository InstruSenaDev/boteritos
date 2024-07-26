import React, { useState } from 'react';

export const UploadFile = ({ title, onFileChange }) => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileChange(file); // Llamar a la función de callback con el archivo seleccionado
        }
    };

    return (
        <div className="flex flex-col max-w-[400px] w-full">
            <p>{title}</p>
            <div className="flex flex-col w-full rounded-md border-orange border-[1.5px]">
                <div className="flex justify-center ">
                    <i></i>
                    <p>Click para subir o arrastre y suelte</p>
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                </div>
                <p>{fileName ? `Archivo seleccionado: ${fileName}` : "(Tamaño maximo del archivo: 5MB)"}</p>
            </div>
        </div>
    );
};