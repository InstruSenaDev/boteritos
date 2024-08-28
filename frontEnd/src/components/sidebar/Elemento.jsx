export const Elemento = ({icon, text}) => {
  return (
    <>
      <div className="w-full flex items-center rounded-3xl text-gray hover:bg-darkBlue hover:text-white cursor-pointer sidebar-element">
        <div className="w-[60px] h-[44px] flex justify-center items-center">
          <i className={`text-xl ${icon}`}></i>
        </div>
        <span className="font-cocogooseLight text-paragraph2 hidden">{text}</span>
      </div>
    </>
  );
};
