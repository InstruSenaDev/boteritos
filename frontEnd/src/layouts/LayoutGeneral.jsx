import { Sidebar } from "../components/sidebar/Sidebar";
import { Layout } from "./Layout";
import { sidebarsection } from "../helper/objects/sidebarElementsArray";
import { Header } from "../components/header/Header";
import React from "react";

export const LayoutGeneral = ({ titleHeader, children }) => {
  // Obtener el rol del usuario desde el localStorage y parsearlo
  const user = JSON.parse(localStorage.getItem("dataUser"));
  const rol = user?.idrol;
  // Seleccionar la sección del sidebar que corresponde al rol
  const selectedSection = sidebarsection[rol] || [];
  return (
    <Layout>
      <Sidebar
        name={user?.nombre || "Usuario"}
        rol={
          rol === 1 ? "Administrador" : rol === 2 ? "Profesor" : "Estudiante"
        }
        // Pasar la sección seleccionada
        sidebarSection={selectedSection}
      />
      <div className="w-full">
        <Header title={titleHeader} />
        <div className="px-5 sm:px-10 py-5 min-w-screen">{children}</div>
      </div>
    </Layout>
  );
};
