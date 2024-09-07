import React from 'react'
import { LayoutGeneral } from '../../layouts/LayoutGeneral'
import { DatesSection } from '../../sections/admin/GeneralRegister/Dates'
import { ProgressBarD } from '../../components/forms/ProgressBar'

export const Dates = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Administrador)" title="Registro">
        <div class="flex w-full h-full items-center justify-center">
          <div class="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD/>
            <DatesSection />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}