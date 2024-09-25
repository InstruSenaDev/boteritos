import React from 'react';

export const Switch = ({ checked, idtrimestre, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked === 1} // Si el estado es 1, el switch estará activado
        onChange={() => onChange(idtrimestre, checked === 1 ? 0 : 1)} // Alterna entre 1 y 0
        className="sr-only peer"
      />
      <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-white after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
      </div>
    </label>
  );
};
