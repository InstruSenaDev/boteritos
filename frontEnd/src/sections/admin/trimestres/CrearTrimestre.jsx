import React, { useEffect, useState } from "react";
import CrearTrim from "../../../components/tables/CrearTrim";
import { VerTrimestres } from "./VerTrimestres";

export const CrearTrimestre = () => {
  const [hasTrimestres, setHasTrimestres] = useState(false);

const handleTrimestresCompletos = () =>{
  setHasTrimestres(true);
}

useEffect(() => {
  const checkTrimestres = async () => {
    const trimestres = JSON.parse(localStorage.getItem("trimestres")) || [];
    setHasTrimestres(trimestres.length >= 4);
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
