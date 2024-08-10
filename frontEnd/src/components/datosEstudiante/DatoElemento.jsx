export const DatoElemento = ({ icon, texto }) => {
    return (
        <div class="bg-white text-darkBlue gap-y-3 p-4 h-[150px]  xl:max-w-[210px] 2xl:max-w-[320px] w-full rounded-xl flex flex-col justify-center items-center ">
            <i className={`text-5xl ${icon}`}></i>
            <p className="font-cocogooseLight text-paragraph">{texto}</p>
        </div>
    )
}