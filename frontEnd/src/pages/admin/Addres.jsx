import React from 'react'
import { LayoutGeneral } from '../../layouts/LayoutGeneral'
import { AdressSection } from '../../sections/admin/GeneralRegister/Address'
import { ProgressBarD } from '../../components/forms/ProgressBar'
import { RegFormProvider } from '../../hooks/RegFormProvider'

export const Addres = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Administrador)" title="Registro">
        <div class="flex w-full h-full items-center justify-center">
          <div class="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <RegFormProvider>
              <ProgressBarD/>
              <AdressSection />
            </RegFormProvider>
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}
