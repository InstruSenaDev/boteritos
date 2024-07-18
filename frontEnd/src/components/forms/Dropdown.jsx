
import { Select, SelectItem } from '@tremor/react';

export function Dropdown({label, name, data}) {
  return (
    <div className="max-w-[400px] flex flex-col gap-2 w-full">
      <div className="text-paragraph font-cocogooseLight text-black">
        {label}
      </div>
      <div className='text-paragraph3 font-cocogooseLight  h-10' >
        <Select
          defaultValue="4"
          className=" w-full border-[1.5px] border-darkBlue rounded-xl focus:bg-darkBlue focus:text-white" 
          name={name}
          required
        >
          
          {data.map((dropdownKey)=>(
           <SelectItem className='cursor-pointer' value= {dropdownKey.value}>{dropdownKey.option}</SelectItem>
          ))}
          
        </Select>
      </div>

    </div>
  );
}
