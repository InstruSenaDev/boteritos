import React, { createContext, useContext, useReducer, useEffect } from "react";

// Crea el contexto
const RegFormContext = createContext();

// Hook personalizado para usar el contexto
export const useRegFormContext = () => {
  return useContext(RegFormContext);
};

// Estado inicial
const initialState = {
  dataForm: new FormData(),
  /*
  //ADMIN
  dataCommon: {},
  dataAddress: {},
  dataDates: {},
  dataPhone: {},
  dataMedical: {},
  //ESTUDIANTE
  commonStudent: {},
  addressStudent: {},
  datesStudent: {},
  phoneStudent: {},
  medicalStudent: {},
  //PROFESOR
  commonTeacher: {},
  addressTeacher: {},
  datesTeacher: {},
  phoneTeacher: {},
  medicalTeacher: {},
    */
  percent: 0, //progress bar
};

initialState.dataForm.append("pito", "tragas");

console.log(initialState);

// Reductor
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA_FORM": {
      console.log(action.data);

      // Crear una nueva instancia de FormData basada en el estado actual
      const updatedFormData = new FormData();

      // Agregar nuevos datos usando action.data (un objeto clave-valor)
      Object.entries(action.data).forEach(([key, value]) => {
        updatedFormData.append(key, value);
      });

      return {
        ...state,
        dataForm: updatedFormData,
      };
    }
    /*
    // ADMIN
    case "SET_COMMON_DATA":
      return { ...state, dataCommon: action.data };
    case "SET_DATE_DATA":
      return { ...state, dataDates: action.data };
    case "SET_ADDRESS_DATA":
      return { ...state, dataAddress: action.data };
    case "SET_MEDICAL_DATA":
      return { ...state, dataMedical: action.data };
    case "SET_PHONE_DATA":
      return { ...state, dataPhone: action.data };

    // PROFESOR
    case "SET_TEACHER_DATA": {
      return {
        ...state,
        commonTeacher: action.data
      };
    }

    case "SET_DATE_TEACHER_DATA": {
      return { ...state, datesTeacher: action.data};
    }

    case "SET_ADDRESS_TEACHER_DATA": {
      return {
        ...state,
        addressTeacher: action.data
      };
    }

    case "SET_MEDICAL_TEACHER_DATA": {
      return {
        ...state,
        medicalTeacher: action.data        
      };
    }

    case "SET_PHONE_TEACHER_DATA": {
      return { ...state, phoneTeacher: action.data };
    }

    //ESTUDIANTE
    case "SET_STUDENT_DATA": {
      return { ...state, commonStudent: { ...action.data } };
    }
    case "SET_DATE_STUDENT_DATA": {
      return { ...state, datesStudent: { ...action.data } };
    }

    case "SET_ADDRESS_STUDENT_DATA": {
      return { ...state, addressStudent: { ...action.data } };
    }

    case "SET_MEDICAL_STUDENT_DATA": {
      return { ...state, medicalStudent: action.data };
    }

    case "SET_PHONE_STUDENT_DATA": {
      return { ...state, phoneStudent: action.data };
    }
    */
    // Acción para consolidar datos del formulario
    // case "SET_FORM_DATA": {
    //   return {
    //     ...state,
    //     formData: {
    //       ...state.formData,
    //       ...action.data,
    //     },
    //   };
    // }

    // PROGRESS BAR
    case "CHANGE_PERCENT":
      return { ...state, percent: action.data };

    default:
      return state;
  }
};

// Define el proveedor de contexto
export const RegFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RegFormContext.Provider value={[state, dispatch]}>
      {children}
    </RegFormContext.Provider>
  );
};
