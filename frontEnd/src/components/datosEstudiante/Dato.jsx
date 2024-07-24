export const Dato = (tituloDato, dato) => {
    return (
        <div class="flex flex-col sm:flex-row gap-x-3">
            <p class="font-cocogooseLight text-paragraph text-darkBlue">{tituloDato}:</p>
            <p class="font-cocogooseLight text-paragraph2 flex-1">{dato}</p>
        </div>
    )
}