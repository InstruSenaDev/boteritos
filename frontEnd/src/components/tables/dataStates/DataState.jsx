const DataState = ({state}) => {
  return (
    <>
    
    {
      state ? 
      <div class="bg-greenOpaque rounded-md py-1 px-2">
        <p class="text-greenFull">Completado</p>
      </div>
      :
      <div class="bg-redOpaque rounded-md py-1 px-2">
        <p class="text-redFull">Incompleto</p>
      </div>
    }
    </>
    
  )
}
export default DataState