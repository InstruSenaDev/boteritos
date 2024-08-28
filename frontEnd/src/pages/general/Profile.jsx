import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { Info } from "../../components/profile/Info";

export const Profile = () => {
  return (
    <LayoutGeneral title="Perfil">
      <div class="px-7 py-4 sm:flex sm:flex-col w-full sm:px-24 sm:py-16 bg-white rounded-xl">
        <h1 class="text-title2 font-Cocogoose-SemiLight text-darkBlue">
          Información personal
        </h1>
        <div class="sm:justify-items-center sm:flex sm:flex-row border-b-2 border-b-placeholderBlue py-7 gap-7">
          <img
            src="../../public/img/perfil.png"
            alt=""
            slot="imagen"
            class="h-[158px]"
          />

          <div class="flex flex-col w-full">
            <Info
              title="Nombre completo"
              text="Sebastian Rodriguez"
              slot="datos"
            />

            <Info title="Correo" text="yo@gmail.com" slot="datos" />
          </div>
        </div>

        <Info title="Fecha de nacimiento" text="22-02-2005" />

        <Info title="Edad" text="19" />

        <Info title="Tipo de documento" text="Cedula de ciudadania" />

        <Info title="NO. de documento" text="1234556" />

        <Info title="Dirección" text="CRa xxb #xx-xx" />

        <Info title="Comuna" text="Zona Franca" />

        <Info title="Teléfono" text="310252500" />

        <Info title="Nombre del responsable" text="Brian Marin" />

        <Info title="Correo del responsable" text="correo@gmail.com" />

        <Info title="Talla de camisa" text="XL" />

        <Info title="Diagnostico" text="Deficit de atencion" />

        <Info
          title="Medicamentos"
          text="Lorem ipsum dolor sit amet consectetur adipiscing elit urna eu, placerat  id vitae class orci quam netus maecenas."
        />

        <Info
          title="Restricciones alimenticias"
          text="Lorem ipsum dolor sit amet consectetur adipiscing elit urna eu, placerat  id vitae class orci quam netus maecenas."
        />

        <Info
          title="Observaciones"
          text="Lorem ipsum dolor sit amet consectetur adipiscing elit urna eu, placerat  id vitae class orci quam netus maecenas.Lorem ipsum dolor sit amet consectetur adipiscing elit urna eu, placerat  id vitae class orci quam netus maecenas.Lorem ipsum dolor sit amet consectetur adipiscing elit urna eu, placerat  id vitae class orci quam netus maecenas."
        />
      </div>
    </LayoutGeneral>
  );
};
