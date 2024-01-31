'use client'

import { createContext, useReducer } from "react"

export const CitiesContext = createContext();

const arrayCitiesAdded= []; //Temperatura º - Localización º 

function reducerCities(state, action) {
    switch (action.type) {
        case "ADD_CITY":
            return (
                [...state, action.payload]
            )
    }
}

export function CitiesProvider({children}){
    const [state, dispatch] = useReducer(reducerCities, arrayCitiesAdded);

    function addCity(city){
        dispatch({
            type: "ADD_CITY",
            payload: city
        });
    }

    return(
        <CitiesContext.Provider 
            value={{
                arrayCitiesAdded:state,
                addCity
            }}
        >
            {children}
        </CitiesContext.Provider>
    )


}