import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { DataStudent } from "../../sections/admin/DataStudent";

const ListEstudiantes = () => {
  return (
    <LayoutGeneral titleHeader="Estudiantes">
      <DataStudent />
    </LayoutGeneral>
  );
};

export default ListEstudiantes;
