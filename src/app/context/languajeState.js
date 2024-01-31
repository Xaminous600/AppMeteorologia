'use client'

import { createContext, useReducer } from "react"

export const LenguajeContext = createContext();

const initialConfiguration= {
    lenguaje: 'español',
    gradosCelsius: true
};

function reducerLanguaje(state, action) {
    switch (action.type) {
        case "CHANGE_LANGUAJE":
            return (
                {
                    lenguaje: action.payload,
                    gradosCelsius: state.gradosCelsius
                }
            )

        case "CHANGE_GRADOS":
            return(
                {
                    lenguaje: state.lenguaje,
                    gradosCelsius: !state.gradosCelsius
                }
            )
    }
}

export function LenguajeProvider({children}){
    const [state, dispatch] = useReducer(reducerLanguaje, initialConfiguration);

    function changeLanguaje(languaje){
        dispatch({
            type: "CHANGE_LANGUAJE",
            payload: languaje
        });
    }

    function changeGrados(){
        dispatch({
            type: "CHANGE_GRADOS"
        });
    }

    return(
        <LenguajeContext.Provider 
            value={{
                initialConfiguration: state, 
                changeLanguaje,
                changeGrados
            }}
        >
            {children}
        </LenguajeContext.Provider>
    )
}