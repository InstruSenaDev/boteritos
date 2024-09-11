const ActionData = ({data, type, goTo}) => {
  return (
    <div
    className={`min-h-[130px] grow ${
        data ? "bg-darkBlue cursor-pointer" : "bg-gray"
    } rounded-xl max-w-[100px] p-4 text-white flex flex-col items-center justify-center gap-3`}
    onClick={() => goTo(data)}
  >
    <i className={`text-5xl ${type == 'go' ? 'fa-regular  fa-eye' : 'fa-solid fa-arrow-turn-up -rotate-90'}`}></i>
    <p className="text-paragraph2">{type == 'go' ? 'Ver' : 'Volver'}</p>
  </div>
  )
}

export default ActionData