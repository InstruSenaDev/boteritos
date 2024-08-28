import React from "react";

export const Boton = ({ text, type }) => {
    const buttonClass = `font-cocogooseRegular tracking-widest text-button max-w-[400px] min-w-28 w-full h-[50px] rounded-xl border-darkBlue ${
        type === 'blue'
            ? 'bg-darkBlue text-white hover:bg-hoverBlue hover:text-white'
            : 'bg-white text-darkBlue hover:bg-darkBlue hover:text-white'
    }`;

    return (
        <button type="submit" className={buttonClass}>
            {text}
        </button>
    );
};


