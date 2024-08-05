import React from 'react';

export const DatoElemento = ({ icon, texto, onClick }) => {
    return (
        <div 
            className="bg-white text-darkBlue gap-y-3 p-4 h-[150px] xl:max-w-[210px] 2xl:max-w-[320px] w-full rounded-xl flex flex-col justify-center items-center cursor-pointer"
            onClick={onClick}
        >
            <i className={`text-5xl ${icon}`}></i>
            <p className="font-cocogooseLight text-paragraph">{texto}</p>
        </div>
    );
}