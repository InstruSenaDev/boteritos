const DataState = ({ state }) => {
  return (
    <>
      {
        state === 1 ? ( // Verifica si el estado es 1
          <div className="bg-greenOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
            <div className="w-[15px] h-[15px] bg-greenFull rounded-full"></div>
            <p className="text-greenFull">Calificado</p>
          </div>
        ) : state === 0 ? (
          <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
            <div className="w-[15px] h-[15px] bg-redFull rounded-full"></div>
            <p className="text-redFull">No calificado</p>
          </div>
        ) : state === 2 ? (
          <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
            <div className="w-[15px] h-[15px] bg-orange rounded-full"></div>
            <p className="text-orange">En espera</p>
          </div>
        ) : null
      }
    </>
  );
};

export default DataState;
