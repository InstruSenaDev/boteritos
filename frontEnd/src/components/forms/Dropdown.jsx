
import { Select, SelectItem } from '@tremor/react';

export function SelectHero() {
  return (
    <div className="max-w-[400px] flex flex-col gap-2 w-full">
      <div className="text-paragraph font-cocogooseLight text-black">
        Select
      </div>
      <div className='text-paragraph3 font-cocogooseLight'>
        <Select
          defaultValue="1"
          className=" rounded-lg w-full  border-darkBlue  border-[1.5px]"
        >
          <SelectItem value="1">Option One</SelectItem>
          <SelectItem value="2">Option Two</SelectItem>
          <SelectItem value="3">Option Three</SelectItem>
        </Select>
      </div>

    </div>
  );
}
