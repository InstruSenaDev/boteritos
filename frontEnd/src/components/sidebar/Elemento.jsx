import { Link } from "react-router-dom";

export const Elemento = ({ icon, text, isExpanded, link }) => {
  return (
    <Link to={`/${link}`} className="w-full">
      <div className="w-full flex items-center rounded-3xl text-gray hover:bg-darkBlue hover:text-white cursor-pointer ">
        <div className="flex items-center">
          <div className="w-[60px] h-[44px] flex justify-center items-center">
            <i className={`text-xl ${icon}`}></i>
          </div>
          {/* Mostrar el texto solo si la sidebar está expandida */}
          <span
            className={`font-cocogooseLight text-paragraph2 ${isExpanded ? "" : "hidden"
              }`}
          >
            {text}
          </span>
        </div>
      </div>
    </Link>
  );
};
