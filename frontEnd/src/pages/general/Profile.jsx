import React, { useState } from 'react';
import ProfileField from '../../components/profile/ProfileField';
import { LayoutGeneral } from '../../layouts/LayoutGeneral';
import profileData from './profileData'; 

const EnhancedProfile = () => {
  const [data, setData] = useState(profileData);

  return (
    <LayoutGeneral titleHeader={"Perfil"}>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center mb-6">
          <img src="../../public/img/perfil.png" alt="Profile" className="w-32 h-32 rounded-full mr-2 sm:mr-6" />
          <div>
            <h2 className="sm:text-subTitle font-cocogooseSemiLight text-darkBlue ">{data.personalInfo.nombre}</h2>
            <p className="text-xs sm:text-paragraph font-cocogooseLight">{data.personalInfo.correo}</p>
          </div>
        </div>
        
        <div className="">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4'>
            <ProfileField label="Fecha de nacimiento" value={data.personalInfo.fechanacimiento} />
            <ProfileField label="Tipo de documento" value={data.personalInfo.tipoDocumento} />
            <ProfileField label="No. Documento" value={data.personalInfo.numeroDocumento} />
            <ProfileField label="Dirección" value={data.personalInfo.direccion} editable />      
            
            <ProfileField label="Teléfono" value={data.contactInfo.telefono} editable />
            <ProfileField label="Nombre del responsable" value={data.contactInfo.nombre} />
            <ProfileField label="Correo del responsable" value={data.contactInfo.correo} editable />
          </div>
        </div>
        
        <div className="mt-8">
         
          <ProfileField label="Tipo de sangre" value={data.medicalInfo.rh} />
          <ProfileField label="Diagnóstico" value={data.medicalInfo.diagnostico} />
          <ProfileField label="Diagnóstico" value={data.medicalInfo.medicamentos} />
          <ProfileField label="Diagnóstico" value={data.medicalInfo.obsevacion} />
        </div>
      </div>
    </LayoutGeneral>
  );
};

export default EnhancedProfile;
