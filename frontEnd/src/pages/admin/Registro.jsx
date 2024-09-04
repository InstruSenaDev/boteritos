import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { Registro as RegistroSection } from "../../sections/admin/Registro";

export const Registro = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios" title="Registro">
        <div class="flex w-full h-full items-center justify-center">
          <div class="flex flex-col max-w-[910px] bg-white  w-full p-10 rounded-xl ">
            <RegistroSection />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};
