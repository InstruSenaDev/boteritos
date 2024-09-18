import React, { useEffect, useState } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";

import {
  dataDoc,
  dataSexo,
  dataTipoParentesco,
  dataDiagnostico,
  dataDiscapacidad,
} from "../../helper/objects/dropdownArray";

export const ModalContentUpdate = ({ section, data, onChange }) => {
  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownSexo: [],
    dataTipoParentesco: [],
    dataDiagnostico: [],
    dataDiscapacidad: [],
  });

  
  useEffect(() => {
    const getDataDropdown = async () => {
      const resultDocumento = await dataDoc();
      const resultSexo = await dataSexo();
      const resultParentesco = await dataTipoParentesco();
      const resultDiagnostico = await dataDiagnostico();
      const resultDiscapacidad = await dataDiscapacidad();
      setDataDropdown({
        dropdownDocumento: resultDocumento,
        dropdownSexo: resultSexo,
        dataTipoParentesco: resultParentesco,
        dataDiagnostico: resultDiagnostico,
        dataDiscapacidad: resultDiscapacidad,
      });
    };

    getDataDropdown();
  }, []);

  
  switch (section) {
    case "Datos personales":
      return <div className="space-y-4"></div>;

    case "Responsables":
      return (
        <div className="space-y-4 w-full flex flex-col items-center">
          <Input
            texto="Nombre"
            placeholder="Ingresa el nombre"
            name="nombre"
            tipo="text"
            onChange={(e) => onChange(e, "nombre")}
            value={data.nombre || ""}
          />
          <Input
            texto="Apellido"
            placeholder="Ingresa el apellido"
            name="apellido"
            tipo="text"
            onChange={(e) => onChange(e, "apellido")}
            value={data.apellido || ""}
          />

          <Input
            texto="Correo"
            placeholder="Ingresa el correo"
            name="correo"
            tipo="text"
            onChange={(e) => onChange(e, "correo")}
            value={data.correo || ""}
          />

          
          <Dropdown
            name="sexo"
            label="Sexo"
            data={dataDropdown.dropdownSexo}
            onChange={(value) =>
              onChange({ target: { name: "sexo", value } })
            }
            value={data.sexo || ""}
            placeholder="Seleccione el sexo"
          />

          <Dropdown
            name="idtipodocumento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) =>
              onChange({ target: { name: "idtipodocumento", value } })
            }
            value={data.idtipodocumento || ""}
            placeholder="Seleccione el tipo de documento"
          />

          <Input
            texto="Número de documento"
            placeholder="Ingresa el número de documento"
            name="numerodocumento"
            tipo="text"
            onChange={(e) => onChange(e, "numerodocumento")}
            value={data.numerodocumento || ""}
          />

          <Input
            texto="Profesión"
            placeholder="Ingresa la profesión"
            name="profesion"
            tipo="text"
            onChange={(e) => onChange(e, "profesion")}
            value={data.profesion || ""}
          />

          <Input
            texto="Ocupación"
            placeholder="Ingresa la ocupación"
            name="ocupacion"
            tipo="text"
            onChange={(e) => onChange(e, "ocupacion")}
            value={data.ocupacion || ""}
          />

          <Input
            texto="Empresa"
            placeholder="Ingresa la empresa"
            name="empresa"
            tipo="text"
            onChange={(e) => onChange(e, "empresa")}
            value={data.empresa || ""}
          />

          <Dropdown
            name="tipoparentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dataTipoParentesco}
            onChange={(value) =>
              onChange({ target: { name: "tipoparentesco", value } })
            }
            value={data.dataTipoParentesco || ""}
            placeholder="Seleccione el tipo de parentesco"
          />
        </div>
      );

    case "Historia clinica":
      return (
        <div className="space-y-4">
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos"
            name="medicamentos"
            tipo="text"
            onChange={(e) => onChange(e, "medicamentos")}
            value={data.medicamentos || ""}
          />
          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restriccionesalimenticias"
            tipo="text"
            onChange={(e) => onChange(e, "restriccionesalimenticias")}
            value={data.restriccionesalimenticias || ""}
          />

          <Dropdown
            name="diagnostico"
            label="Diagnostico"
            data={dataDropdown.diagnostico}
            onChange={(value) =>
              onChange({ target: { name: "diagnostico", value } })
            }
            value={data.diagnostico || ""}
            placeholder="Seleccione el diagnostico"
          />

          <Input
            texto="Observación"
            placeholder="Ingresa la observación"
            name="observacion"
            tipo="text"
            onChange={(e) => onChange(e, "observacion")}
            value={data.observacion || ""}
          />

          <Dropdown
            name="discapacidad"
            label="Discapacidad"
            data={dataDropdown.discapacidad}
            onChange={(value) =>
              onChange({ target: { name: "discapacidad", value } })
            }
            value={data.discapacidad || ""}
            placeholder="Seleccione la discapacidad"
          />
        </div>
      );

    case "Datos Medicos":
      return (
        <div className="space-y-4">
          <Input
            texto="Lugar de atención"
            placeholder="Ingresa el lugar de atención"
            name="lugaratencion"
            tipo="text"
            onChange={(e) => onChange(e, "lugaratencion")}
            value={data.lugaratencion || ""}
          />

          <Input
            texto="Peso"
            placeholder="Ingresa el peso"
            name="peso"
            tipo="text"
            onChange={(e) => onChange(e, "peso")}
            value={data.peso || ""}
          />

          <Input
            texto="Altura"
            placeholder="Ingresa la altura"
            name="altura"
            tipo="text"
            onChange={(e) => onChange(e, "altura")}
            value={data.altura || ""}
          />

          <Dropdown
            name="eps"
            label="Eps"
            data={dataDropdown.eps}
            onChange={(value) => onChange({ target: { name: "eps", value } })}
            value={data.eps || ""}
            placeholder="Seleccione la eps"
          />

          <Dropdown
            name="rh"
            label="Tipo de sangre"
            data={dataDropdown.rh}
            onChange={(value) => onChange({ target: { name: "rh", value } })}
            value={data.rh || ""}
            placeholder="Seleccione el tipo de sangre"
          />

        </div>
      );

    case "Contactos":
      return (
        <div className="space-y-4">
          <Input
            texto="Teléfono"
            placeholder="Ingresa el teléfono"
            name="telefono1"
            tipo="text"
            onChange={(e) => onChange(e, "telefono1")}
            value={data.telefono1 || ""}
          />
          <Input
            texto="Segundo teléfono"
            placeholder="Ingresa un segundo teléfono"
            name="telefono2"
            tipo="text"
            onChange={(e) => onChange(e, "telefono2")}
            value={data.telefono2 || ""}
          />
        </div>
      );

    case "Dirección":
      return (
        <div className="space-y-4">
          <Input
            texto="Comuna"
            placeholder="Ingresa la comuna"
            name="comuna"
            tipo="text"
            onChange={(e) => onChange(e, "comuna")}
            value={data.comuna || ""}
          />
          <Input
            texto="Número"
            placeholder="Ingresa el número"
            name="numero"
            tipo="text"
            onChange={(e) => onChange(e, "numero")}
            value={data.numero || ""}
          />

          <Input
            texto="Barrio"
            placeholder="Ingresa el barrio"
            name="barrio"
            tipo="text"
            onChange={(e) => onChange(e, "barrio")}
            value={data.barrio || ""}
          />
        </div>
      );

    default:
      return <div>No content available</div>;
  }
};
