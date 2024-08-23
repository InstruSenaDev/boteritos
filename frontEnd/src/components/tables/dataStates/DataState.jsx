const DataState = ({state}) => {
  
  return (
    <>
    
    {
      state ? 
      <div className="bg-greenOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
        <div className="w-[15px] h-[15px] bg-greenFull rounded-full"></div>
        <p className="text-greenFull">Completo</p>
      </div>
      :
      <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto ">
        <div className="w-[15px] h-[15px] bg-redFull rounded-full"></div>
        <p className="text-redFull">Incompleto</p>
      </div>
    }
    </>
    
  )
}
export default DataState