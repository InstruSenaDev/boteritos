import { Sidebar } from "../components/sidebar/Sidebar";
import { Layout } from "./Layout";
import { Header } from "../components/header/Header";
import React from "react";


export const LayoutGeneral = ({titleHeader, children }) => {
  // Obtener el rol del usuario desde el localStorage y parsearlo
  //  const user = JSON.parse(localStorage.getItem('dataUser'));
  //  const rol = user?.idrol;
  return (
      <Layout>
        <Sidebar name={"Brian David Marin Hernandez"} rol={"Administrador"}/>
        <div className="w-full">
          <Header title={titleHeader} />
          <div className="px-5 sm:px-10 py-5 min-w-screen">
            {children}
          </div>
        </div>
      </Layout>
  );
};
