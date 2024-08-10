export const InformeIndividual = ({tituloArea, data, children}) => {
    return(
        <div className="w-full divide-y-2 divide-placeholderBlue bg-white rounded-xl flex flex-col px-10 py-5">
            <div className="flex justify-between text-darkBlue py-5">
                <p className="font-cocogooseSemiLight text-subTitle">{tituloArea}</p>
                <div className="flex font-cocogooseSemiLight text-title2 max-w-[250px] w-full justify-between">
                    <p>L.A</p>
                    <p>L.P</p>
                    <p>L.N</p>
                </div>
            </div>
            {data.map((dataKey)=>(
            <div key={dataKey.id} className="h-[66px] w-full py-5 flex justify-between">
                <p className="font-cocogooseLight text-paragraph">{dataKey.logroTexto}</p>
                <div className="flex font-cocogooseSemiLight text-title2 text-orange max-w-[250px] w-full justify-between px-[10px]">
                    <p>X</p>
                    <p>X</p>
                    <p>X</p>
                </div>
            </div>
            ))}
            <div>
                {children}
            </div>
        </div>
    )
}