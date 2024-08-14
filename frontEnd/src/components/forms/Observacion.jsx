export const Observacion = ({ texto, placeholder, name, value }) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="border-b-2 border-b-placeholderBlue p-2 w-full">
          <label htmlFor={name} className="text-paragraph font-cocogooseLight text-black">{texto}</label>
        </div>
        <div className="relative w-full flex p-2">
          <textarea
            required
            id={name}
            name={name}
            placeholder={placeholder}
            className="rounded-xl w-full px-5 text-paragraph3 border-none font-cocogooseLight border-[1.5px] resize-none focus:outline-none"
            value={value}
            rows="5"
          />
        </div>
      </div>
    );
  };
  