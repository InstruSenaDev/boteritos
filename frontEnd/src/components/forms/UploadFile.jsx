export const UploadFile = ({ title }) => {
    return (
        <>
            <div class="flex flex-col max-w-[400px] w-full">
                <p>{title}</p>
                <div class="flex flex-col w-full rounded-md border-orange border-[1.5px]">
                    <div class="flex justify-center ">
                        <i></i>
                        <p>Click para subir o arrastre y suelte</p>
                        <input type="file" accept=".pdf" />
                    </div>
                    <p>(Tamaño maximo del archivo: 25MB)</p>
                </div>
            </div>

        </>
    )
}