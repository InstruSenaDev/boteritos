import React from "react";

export const Notificacion = ({ nombre, area, hora, img }) => {
  return (
    <div class="flex px-2 py-5 gap-x-5 ">
      <div class=" w-[60px] min-w-[60px] h-[60px] rounded-full  ">
        <img
          src={img}
          alt="Hola"
          class="w-full h-full object-cover rounded-full"
        />
      </div>
      <div>
        <p class="font-cocogooseSemiLight text-paragraph3 sm:text-subTitle2">
          <span class="text-darkBlue">{nombre}</span> ha creado un nuevo logro
          para el area: {area}
        </p>
        <p class="font-cocogooseLight text-paragraph3 sm:text-paragraph text-darkBlue">
          hace {hora} hora(s)
        </p>
      </div>
    </div>
  );
};
