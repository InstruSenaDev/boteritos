import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import {ListStudentsSection } from '../../sections/profesor/ListStudentsSection';

export const ListStudents = () => {
  return (
    <LayoutGeneral title="Estudiantes">
      <ListStudentsSection/>
    </LayoutGeneral>
  );
};
