import React, { useEffect, useState } from "react";
import CrearTrim from "../../../components/tables/CrearTrim";
import { VerTrimestres } from "./VerTrimestres";

export const CrearTrimestre = () => {
  const [hasTrimestres, setHasTrimestres] = useState(false);

  const handleTrimestresCompletos = () => {
    setHasTrimestres(true);
  };

  useEffect(() => {
    const checkTrimestres = () => {
      const trimestres = JSON.parse(localStorage.getItem("trimestres")) || [];
      const fechaActual = new Date();

      const validTrimestres = trimestres.filter(({ inicio, fin }) => {
        const inicioDate = new Date(inicio);
        const finDate = new Date(fin);
        return inicioDate <= finDate && inicioDate <= fechaActual && finDate >= fechaActual;
      });

      setHasTrimestres(validTrimestres.length >= 4);
    };

    checkTrimestres();
  }, []);

  return (
    <main className="flex flex-col gap-8">
      {hasTrimestres ? (
        <VerTrimestres />
      ) : (
        <CrearTrim onTrimestresCompletos={handleTrimestresCompletos} />
      )}
    </main>
  );
};
