// src/components/forms/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ texto, placeholder, icon }) => {
  return (
    <div className="max-w-[400px] flex flex-col gap-2 text-xd w-full">
      <label htmlFor="input" className="text-paragraph font-cocogooseLight text-black">{texto}</label>
      <div className="relative w-full flex">
        <input
          type="text"
          id="input"
          placeholder={placeholder}
          className="h-10 rounded-xl w-full px-5 pb-[5px] text-paragraph3 border-darkBlue font-cocogooseLight border-[1.5px]"
        />
        {icon && (
          <img
            src={icon}
            alt="Icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  texto: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
