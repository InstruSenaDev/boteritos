const DataState = ({state}) => {
  return (
    <>
    
    {
      state ? 
      <div class="bg-greenOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
        <div class="w-[15px] h-[15px] bg-greenFull rounded-full"></div>
        <p class="text-greenFull">Completado</p>
      </div>
      :
      <div class="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
        <div class="w-[15px] h-[15px] bg-redFull rounded-full"></div>
        <p class="text-redFull">Incompleto</p>
      </div>
    }
    </>
    
  )
}
export default DataState