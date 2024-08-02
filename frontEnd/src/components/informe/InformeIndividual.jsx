export const InformeIndividual = ({tituloArea, logroTexto, data}) => {
    return(
        <div className="w-full bg-white rounded-xl flex flex-col px-10 py-5">
            <div className="flex justify-between text-darkBlue">
                <p className="font-cocogooseSemiLight text-subTitle">{tituloArea}</p>
                <div className="flex font-cocogooseSemiLight text-title2 max-w-[250px] w-full justify-between">
                    <p>L.A</p>
                    <p>L.P</p>
                    <p>L.N</p>
                </div>
            </div>
            <div className="h-[66px] py-5  flex justify-between">
                <p className="font-cocogooseLight text-paragraph">{logroTexto}</p>
                <div className="flex font-cocogooseSemiLight text-title2 text-orange max-w-[250px] w-full justify-between px-[10px]">
                    <p>X</p>
                    <p>X</p>
                    <p>X</p>
                </div>
            </div>
        </div>
    )
}