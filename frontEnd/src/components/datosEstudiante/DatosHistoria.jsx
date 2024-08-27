export const DatosHistoria = ({titulo, children}) => {
    return (
        <div className="w-full bg-white p-6 rounded-xl flex flex-col gap-y-5">
            <div className="flex justify-between text-darkBlue">
                <p className="font-cocogooseSemiLight text-subTitle">{titulo}</p>
                <p className="font-cocogooseSemiLight text-subTitle2 underline">Editar</p>
            </div>
            <div className="flex px-5 justify-between gap-x-5">
                <div className="flex flex-col w-full gap-y-3">
                    {children}
                </div>
            </div>
        </div>
    )
}