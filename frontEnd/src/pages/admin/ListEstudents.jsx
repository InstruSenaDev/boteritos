import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { DataStudent } from "../../sections/admin/DataStudent";

export const ListEstudiantes = () => {
  return (
    <LayoutGeneral titleHeader="Estudiantes">
      <DataStudent />
    </LayoutGeneral>
  );
};
