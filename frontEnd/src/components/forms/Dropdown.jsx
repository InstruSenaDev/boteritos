
import { Select, SelectItem } from '@tremor/react';
import { useState } from 'react';

export function Dropdown({ label, name, data, valueChange }) {

  const [value, setValue] = useState();

    const handleChange = (e) => {
        //console.log(e);
        valueChange = setValue(value)
    };

    return (
        <div className="max-w-[400px] flex flex-col gap-2 w-full">
            <div className="text-paragraph font-cocogooseLight text-black">
                {label}
            </div>
            <div className='text-paragraph3 font-cocogooseLight h-10'>
                <Select
                    defaultValue=""
                    className="w-full border-[1.5px] border-darkBlue rounded-xl focus:bg-darkBlue focus:text-white"
                    name={name}
                    onChange={handleChange}
                    required
                >
                    {data.map((dropdownKey) => (
                        <SelectItem key={dropdownKey.value} className='cursor-pointer' value={dropdownKey.value}>
                            {dropdownKey.option}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}