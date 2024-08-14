import { DatePicker } from '@tremor/react';
import { es } from 'date-fns/locale';

export function DatePicker2({name, texto}) {
  return <div className=" flex flex-col gap-2">
    <label htmlFor={name} className="text-paragraph font-cocogooseLight text-black rounded-xl">{texto}</label>
    <div className='max-h-10 h-full rounded-xl max-w-[400px] w-full text-paragraph3 border-darkBlue font-cocogooseLight border-[1.5px]'>
      <DatePicker locale={es} placeholder='Selecciona la fecha' className=" w-full h-full " />
    </div>
  </div>
}