import { Sidebar } from "../components/sidebar/Sidebar";
import { Layout } from "./Layout";
import { sidebarsection } from "../helper/objects/sidebarElementsArray";
import { Header } from "../components/header/Header";
import React, { useState } from "react";

export const LayoutGeneral = ({ titleHeader, children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Estado de expansión de la sidebar

  // Obtener el rol del usuario desde el localStorage y parsearlo
  const user = JSON.parse(localStorage.getItem("dataUser"));
  const rol = user?.idrol;
  
  // Seleccionar la sección del sidebar que corresponde al rol
  const selectedSection = sidebarsection[rol] || [];

  return (
    <Layout>
      {/* Sidebar */}
      <Sidebar
        name={user?.nombre || "Usuario"}
        rol={
          rol === 1 ? "Administrador" : rol === 2 ? "Profesor" : "Estudiante"
        }
        sidebarSection={selectedSection}
        onToggle={setIsSidebarExpanded} // Escuchar el estado de expansión
      />

      {/* Overlay, se muestra solo si la sidebar está expandida */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isSidebarExpanded ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Contenido principal */}
      <div className="w-full h-full">
        <Header title={titleHeader} />
        <div className="px-5 sm:px-10 py-5 min-w-screen h-full">{children}</div>
      </div>
    </Layout>
  );
};