// src/components/modales/ModalContent.js
import React from 'react';

export const ModalContentUpdate = ({ section, data, onChange }) => {
  switch (section) {
    case "Datos personales":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-darkBlue">Nombres</label>
            <input
              type="text"
              value={data.nombre || ''}
              onChange={(e) => onChange(e, 'nombre')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-darkBlue">Apellidos</label>
            <input
              type="text"
              value={data.apellido || ''}
              onChange={(e) => onChange(e, 'apellido')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add more fields as needed */}
        </div>
      );

    case "Responsables":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-darkBlue">Nombres</label>
            <input
              type="text"
              value={data.nombre || ''}
              onChange={(e) => onChange(e, 'nombre')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-darkBlue">Apellidos</label>
            <input
              type="text"
              value={data.apellido || ''}
              onChange={(e) => onChange(e, 'apellido')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add more fields as needed */}
        </div>
      );

    case "Historia Clinica":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-darkBlue">Diagnóstico</label>
            <input
              type="text"
              value={data.diagnostico || ''}
              onChange={(e) => onChange(e, 'diagnostico')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-darkBlue">Tratamiento</label>
            <input
              type="text"
              value={data.tratamiento || ''}
              onChange={(e) => onChange(e, 'tratamiento')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add more fields as needed */}
        </div>
      );

    case "Datos Medicos":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-darkBlue">Alergias</label>
            <input
              type="text"
              value={data.alergias || ''}
              onChange={(e) => onChange(e, 'alergias')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-darkBlue">Condiciones Médicas</label>
            <input
              type="text"
              value={data.condicionesMedicas || ''}
              onChange={(e) => onChange(e, 'condicionesMedicas')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add more fields as needed */}
        </div>
      );

    case "Contactos":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-darkBlue">Tipo</label>
            <input
              type="text"
              value={data.tipo || ''}
              onChange={(e) => onChange(e, 'tipo')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-darkBlue">Número</label>
            <input
              type="text"
              value={data.numero || ''}
              onChange={(e) => onChange(e, 'numero')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add more fields as needed */}
        </div>
      );

    case "Dirección":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-darkBlue">Dirección</label>
            <input
              type="text"
              value={data.direccion || ''}
              onChange={(e) => onChange(e, 'direccion')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-darkBlue">Ciudad</label>
            <input
              type="text"
              value={data.ciudad || ''}
              onChange={(e) => onChange(e, 'ciudad')}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add more fields as needed */}
        </div>
      );

    default:
      return <div>No content available</div>;
  }
};
