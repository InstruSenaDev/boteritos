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
          <img src="../../public/img/perfil.png" alt="Profile" className="w-32 h-32 rounded-full mr-6" />
          <div>
            <h2 className="text-subTitle font-cocogooseSemiLight text-darkBlue">{data.personalInfo.name}</h2>
            <p className="text-paragraph font-cocogooseLight">{data.personalInfo.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-subTitle2 font-cocogooseSemiLight text-darkBlue mb-4">Información Personal</h2>
            <ProfileField label="Fecha de nacimiento" value={data.personalInfo.birthDate} />
            <ProfileField label="Tipo de documento" value={data.personalInfo.documentType} />
            <ProfileField label="No. Documento" value={data.personalInfo.documentNumber} />
            <ProfileField label="Dirección" value={data.personalInfo.address} editable />
          </div>
          
          <div>
            <h2 className="text-subTitle2 font-cocogooseSemiLight text-darkBlue mb-4">Contacto</h2>
            <ProfileField label="Teléfono" value={data.contactInfo.phone} editable />
            <ProfileField label="Nombre del responsable" value={data.contactInfo.responsibleName} />
            <ProfileField label="Correo del responsable" value={data.contactInfo.responsibleEmail} editable />
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-subTitle2 font-cocogooseSemiLight text-darkBlue mb-4">Información Médica</h2>
          <ProfileField label="Tipo de sangre" value={data.medicalInfo.bloodType} />
          <ProfileField label="Diagnóstico" value={data.medicalInfo.diagnosis} />
          <div className="bg-backgroundWhite p-4 rounded-lg mb-4">
            <h3 className="text-paragraph font-cocogooseLight text-darkBlue mb-2">Medicamentos</h3>
            <p className="text-paragraph2 font-cocogooseLight">{data.medicalInfo.medications}</p>
          </div>
          <div className="bg-backgroundWhite p-4 rounded-lg">
            <h3 className="text-paragraph font-cocogooseLight text-darkBlue mb-2">Observaciones</h3>
            <p className="text-paragraph2 font-cocogooseLight">{data.medicalInfo.observations}</p>
          </div>
        </div>
      </div>
    </LayoutGeneral>
  );
};

export default EnhancedProfile;
