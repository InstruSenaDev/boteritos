export const InformeIndividual = ({tituloArea}) => {
    return(
        <div className="w-full bg-white rounded-xl flex flex-col px-10 py-5">
            <div>
                <p>{tituloArea}</p>
                <div>
                    <p>L.A</p>
                    <p>L.P</p>
                    <p>L.N</p>
                </div>
            </div>
        </div>
    )
}