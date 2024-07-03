


const HeaderData = () => {
  return (
    <div class="flex gap-3 text-black font-cocogooseLight sm:flex-row flex-col">
      {/*IMAGEN DEL ESTUDIANTE*/}
      <div class="min-h-[130px] grow bg-white rounded-xl max-w-[100px] p-4">
        <img
          src="../../../../public/img/studentDefault.png"
          alt=""
          class="w-full object-cover"
        />
      </div>

      {/* INFORMACION */}
      <div class="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col gap-1">
        <p class="text-paragraph text-darkBlue">Nombre del estudiante</p>
        <p class="text-paragraph2">Identificacion</p>
        <p class="text-paragraph2">XX años</p>
        {/* PARA LOS ICONOS, SE HARÁ UN COMPONENTE */}
        <div class="flex gap-3">
          <div class="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i class="fa-solid fa-hospital text-[8px] text-gray"></i>
          </div>
          <div class="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i class="fa-solid fa-user-group text-[8px] text-gray"></i>
          </div>
          <div class="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i class="fa-solid fa-address-card text-[8px] text-gray"></i>
          </div>
          <div class="w-[15px] h-[15px] bg-grayOpaque flex justify-center items-center rounded">
            <i class="fa-solid fa-phone text-[8px] text-gray"></i>
          </div>
        </div>
      </div>

      <div class="min-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        <div class="flex justify-between w-full">
          <p class="text-paragraph text-darkBlue">Madre:</p>
          <p class="text-paragraph3">-------------------</p>
        </div>
        <div class="flex justify-between w-full">
          <p class="text-paragraph text-darkBlue">Padre:</p>
          <p class="text-paragraph3">-------------------</p>
        </div>
        <div class="flex justify-between w-full">
          <p class="text-paragraph text-darkBlue">Telefono:</p>
          <p class="text-paragraph3">XX-XXX-XXXX-XXX</p>
        </div>
      </div>

      {/* ESTADISTICAS */}
      <div class="min-h-[130px] grow bg-white rounded-xl p-4">
        Aqui iria la gran grafica
      </div>

      {/*BOTON VER */}
      <div class="min-h-[130px] grow bg-gray rounded-xl max-w-[100px] p-4 text-white flex flex-col items-center justify-center gap-3">
        <i class="fa-regular fa-eye text-5xl"></i>
        <p class="text-paragraph2">Ver</p>
      </div>
    </div>
  );
};

export default HeaderData;
