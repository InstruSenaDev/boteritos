import { Elemento } from "./Elemento";
import { useState } from "react";

export const Sidebar = ({ img, name, rol, sidebarSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`hidden xl:flex w-[95px] h-screen sticky top-0 z-50`}>
      <div className="w-full h-screen sticky top-0">
        <div
          className={`absolute sidebar h-screen bg-white flex-col items-center flex-shrink-0 transition-all duration-300 ${isExpanded ? 'w-[300px]' : 'w-[95px]'}`}
        >
          <div className="bg-darkBlue px-5 h-[100px] w-full flex items-center mb-6 relative justify-center text-white">
            <div className="w-[60px] min-w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
              <img
                src={img || ""}
                alt="Easter egg"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className={`font-cocogooseLight ml-2 ${isExpanded ? '' : 'hidden'}`} id="sidebar-text">
              <p className="text-paragraph2">{name}</p>
              <p className="text-paragraph3">{rol}</p>
            </div>
            <div
              className="w-[24px] h-[24px] rounded-full bg-white shadow-2xl text-sm text-black flex justify-center items-center absolute right-[-12px] cursor-pointer"
              onClick={toggleSidebar}
            >
              <i className={`fa-solid fa-angle-${isExpanded ? 'left' : 'right'}`}></i>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-4 w-full px-4">
            {sidebarSection.map((section) => (
              <Elemento
                key={section.texto}
                icon={section.icon}
                text={section.texto}
                isExpanded={isExpanded}
              />
            ))}
            <div className="w-full border-darkBlue border-[1px]"></div>
            <Elemento
              icon="fa-solid fa-arrow-right-from-bracket"
              text="Salir"
              isExpanded={isExpanded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};