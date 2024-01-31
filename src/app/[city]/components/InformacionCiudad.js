'use client'

import { useContext } from "react";
import { LenguajeContext } from "@/app/context/languajeState";

function formatearHorario(horarios){
    const horario= new Date(horarios);
    let horas = 0;
    let minutos = 0;
  
    horario.getUTCHours()/10 >= 1 ? horas= horario.getUTCHours() : horas = '0' + horario.getUTCHours() ;
    horario.getUTCMinutes()/10 >= 1 ? minutos = horario.getUTCMinutes() : minutos = '0' + horario.getUTCMinutes() ;
  
    return (horas + ':' + minutos);
  }

export default function InformacionCiudad({temporal}){
    const {initialConfiguration} = useContext(LenguajeContext);
    
    return(
      <>
        <div>
          <h1>{Math.round(temporal.humidityAvg)} %</h1>
          <span>{initialConfiguration.lenguaje === 'español' ? 'Humedad' : 'Humidity'}</span>
        </div>
  
        <div>
          <h1>{Math.round(temporal.windSpeedAvg)} km/h</h1>
          <span>{initialConfiguration.lenguaje === 'español' ? 'Viento' : 'Wind'}</span>
        </div>
  
        <div>
          <h1>{Math.round(temporal.precipitationProbabilityAvg)} %</h1>
          <span>{initialConfiguration.lenguaje === 'español' ? 'LLuvia' : 'Rain'}</span>
        </div>
        
        <div>
          <h1>{Math.round(temporal.visibilityAvg)} %</h1>
          <span>{initialConfiguration.lenguaje === 'español' ? 'Visibilidad' : 'Visibility'}</span>
        </div>
  
        <div>
          <h1>{formatearHorario(temporal.sunsetTime)}</h1>
          <span>{initialConfiguration.lenguaje === 'español' ? 'Atardecer' : 'Sunset'}</span>
        </div>
  
      
        <div>
          <h1>{formatearHorario(temporal.sunriseTime)}</h1>
          <span>{initialConfiguration.lenguaje === 'español' ? 'Amanecer' : 'Sunrise'}</span>
        </div>
      </>
    )
  }