export const DatosHistoria = ({titulo, children}) => {
    return (
        <div class="w-full bg-white p-6 rounded-xl flex flex-col gap-y-5">
            <div class="flex justify-between text-darkBlue">
                <p class="font-cocogooseSemiLight text-subTitle">{titulo}</p>
                <p class="font-cocogooseSemiLight text-subTitle2 underline">Editar</p>
            </div>
            <div class="flex px-5 justify-between gap-x-5">
                <div class="flex flex-col w-full gap-y-3">
                    {children}
                </div>
            </div>
        </div>
    )
}