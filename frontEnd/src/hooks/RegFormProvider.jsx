import React, { createContext, useContext, useReducer } from 'react'


const RegFormContext = createContext();
export const useRegFormContext = () => {
    return useContext(RegFormContext);
}

const reducer = (state, action) => {
    // { type, data }
    switch (action.type) {
        case 'SET_COMMON_DATA': {
            return {...state, common: {...action.data}};
        }
        case 'SET_DATE_DATA':{
            return{...state, date: {...action.data}};
        }
        case 'SET_ADDRESS_DATA':{
            return{...state, address: {...action.data}};
        }
        case 'SET_MEDICAL_DATA':{
            return{...state, percent: action.data};
        }
        case 'SET_PHONE_DATA':{
            return{...state, percent: action.data};
        }
        case 'CHANGE_PERCENT':{
            return{...state, percent: action.data};
        }

    }
    return state;
}

export const RegFormProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {percent: 0});

    return <RegFormContext.Provider value={[state, dispatch]}>
        {children}
    </RegFormContext.Provider>
}
