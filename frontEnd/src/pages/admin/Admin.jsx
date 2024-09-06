import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { GeneralRegister } from "../../sections/admin/GeneralRegister/GeneralRegister";
import { ProgressBarD } from "../../components/forms/ProgressBar";

export const Admin = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Administrador)" title="Registro">
        <div class="flex w-full h-full items-center justify-center">
          <div class="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD/>
            <GeneralRegister />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};
