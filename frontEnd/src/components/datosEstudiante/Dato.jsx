import React from 'react';

export const Dato = ({ tituloDato, dato }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-x-3">
      <p className="font-cocogooseLight text-paragraph text-darkBlue">{tituloDato}:</p>
      <p className="font-cocogooseLight text-paragraph2 flex-1">{dato}</p>
    </div>
  );
};