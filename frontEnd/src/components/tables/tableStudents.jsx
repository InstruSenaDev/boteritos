import { useState } from 'preact/hooks'

export default function TableStudents(texto){
    const [infoStudent, setInfoStudent] = useState();

    return (
        <>
            <div class="w-11 bg-darkBlue">
                <p>{texto}</p>
            </div>
        </>
    )
}