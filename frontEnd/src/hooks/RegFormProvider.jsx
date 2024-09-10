import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Crea el contexto
const RegFormContext = createContext();

// Hook personalizado para usar el contexto
export const useRegFormContext = () => {
    return useContext(RegFormContext);
};

// Estado inicial
const initialState = {
    dataCommon: {},
    dataAddress: {},
    dataDates: {},
    dataPhone: {},
    dataMedical: {},
    percent: 0 //progress bar
};

// Reductor
const reducer = (state, action) => {
    switch (action.type) {
        // ADMIN
        case 'SET_COMMON_DATA':
            return { ...state, dataCommon: action.data };
        case 'SET_DATE_DATA':
            return { ...state, dataDates: action.data };
        case 'SET_ADDRESS_DATA':
            return { ...state, dataAddress: action.data };
        case 'SET_MEDICAL_DATA':
            return { ...state, dataMedical: action.data };
        case 'SET_PHONE_DATA':
            return { ...state, dataPhone: action.data };

        //PROFESOR
        case 'SET_TEACHER_DATA': {
            return { ...state, percent: action.data };
        }
        case 'SET_DATE_TEACHER_DATA': {
            return { ...state, percent: action.data };
        }
        case 'SET_ADDRESS_TEACHER_DATA': {
            return { ...state, percent: action.data };
        }
        case 'SET_MEDICAL_TEACHER_DATA': {
            return { ...state, percent: action.data };
        }
        case 'SET_PHONE_TEACHER_DATA': {
            return { ...state, percent: action.data };
        }
        case 'SET_PROFESSION_DATA': {
            return { ...state, percent: action.data };
        }
        //ESTUDIANTE
        case 'SET_STUDENT_DATA': {
            return { ...state, common: { ...action.data } };
        }
        case 'SET_DATE_STUDENT_DATA': {
            return { ...state, date: { ...action.data } };
        }
        case 'SET_ADDRESS_STUDENT_DATA': {
            return { ...state, address: { ...action.data } };
        }
        case 'SET_MEDICAL_STUDENT_DATA': {
            return { ...state, percent: action.data };
        }
        case 'SET_PHONE_STUDENT_DATA': {
            return { ...state, percent: action.data };
        }

        // PROGRESS BAR
        case 'CHANGE_PERCENT':
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