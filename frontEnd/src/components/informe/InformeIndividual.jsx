export const InformeIndividual = ({tituloArea}) => {
    return(
        <div className="w-full bg-white rounded-xl flex flex-col px-10 py-5">
            <div className="flex">
                <p>{tituloArea}</p>
                <div className="flex ">
                    <p>L.A</p>
                    <p>L.P</p>
                    <p>L.N</p>
                </div>
            </div>
        </div>
    )
}