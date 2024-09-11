import React from "react";
import CrearTrim from "../../../components/tables/CrearTrim";
import { VerTrimestres } from "./VerTrimestres";

export const CrearTrimestre = () => {
  return (
    <>
      <main className="flex flex-col gap-8">
        <VerTrimestres />
        <CrearTrim />
      </main>
    </>
  );
};
