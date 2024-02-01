'use client'

import { useContext } from "react";
import { LenguajeContext } from "@/app/context/languajeState";

function nivelCalidadAire(calidad, idioma){

  if(calidad <= 30){

    return(
      {
        nombre: idioma === 'español' ?  'Bajo' : 'Low',
        color: '#00FF00'
      }
    )
  }
  else if(calidad > 30 && calidad < 75){
    return(
      {
        nombre: idioma === 'español' ? 'Moderado' : 'Moderate',
        color: '#FFFF00'
      }
    )
  }
  else{
    return({
      nombre: idioma === 'español' ? 'Alto' : 'High',
      color: '#FF0000'
    })
  }
}

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function GraficaCalidadAire({airPollutionDay}){
    const {initialConfiguration} = useContext(LenguajeContext);
    
    let calidadAire = [];

    if(airPollutionDay !== 'Unknown station'){
      calidadAire = nivelCalidadAire(airPollutionDay.iaqi.pm25.v, initialConfiguration.lenguaje);
    }

    return(
        <div className='tiempoGrafica'>
          {airPollutionDay != 'Unknown station' && 
            <>
            <h1>{initialConfiguration.lenguaje === 'español' ? 'Contaminación en el aire' : 'Air Quality Index'}</h1>
              <div> 
                <div>
                  <h1>{calidadAire.nombre}</h1>
                  <span>{airPollutionDay.iaqi.pm25.v + '%'}</span>
                </div>
                <Chart 
                  type="radialBar"
                  width={190}
                  height={190}
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    fill:{colors:[calidadAire.color]},
                    labels: [" "] ,
                    plotOptions:{
                      radialBar:{
                        dataLabels:{
                          value:{
                            show: false,
                          }
                        }
                      }
                    }
                  }}
                  labels={['UV']}
                  series={[airPollutionDay.iaqi.pm25.v]}
                />
                </div>
                <h1>{initialConfiguration.lenguaje === 'español' ? 'Datos proporcionados por:' : 'Data provided by: '} {airPollutionDay.attributions[0].name}</h1>
            </>
            }
            {airPollutionDay === 'Unknown station'&& 
              <div style={{width:'100%', fontSize:'20px', color:'white', textAlign:'center', display:'flex', justifyContent:'center'}}>
                <h1>{initialConfiguration.lenguaje === 'español' ? 'No se ha podido encontrar información de esta ciudad' : 'Data not found'}</h1>
              </div>
            }
        </div>
    )
}