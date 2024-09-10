import React from 'react'
import { LayoutGeneral } from '../../../layouts/LayoutGeneral'
import { PhoneNumberSection } from '../../../sections/admin/TeacherRegister/PhoneNumbers'
import { ProgressBarD } from '../../../components/forms/ProgressBar'
import { RegFormProvider } from '../../../hooks/RegFormProvider'

const PhoneNumber = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Profesor)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <PhoneNumberSection />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}

export default PhoneNumber;
