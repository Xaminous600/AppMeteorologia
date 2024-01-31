'use client'

import { useContext } from "react";
import { LenguajeContext } from "@/app/context/languajeState";

function DiaSemana({fecha}){
    const {initialConfiguration} = useContext(LenguajeContext);
  
    const dia = new Date(fecha).getDay();
    const mes = new Date(fecha).getMonth();
    const diaMes = new Date(fecha).getDate();
  
    const dias = ['Dom.','Lun.','Mar.','Miérc.','Juev.','Vier.','Sáb.'];
    const meses= ['En','Febr','Mar','Abr','May','Jun','Jul','Ag','Sept','Oct','Nov', 'Dic'];
  
    const days = ['Sun.','Mon.','Tues.','Wed.','Thurs.','Fri.','Sat.'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov', 'Dec'];
  
      if(initialConfiguration.lenguaje === 'español'){
        return (
          <td>
            <span>{diaMes}</span>
            <span>{dias[dia]} {meses[mes]}</span>
          </td>
        )
      }
      else{
        return(
          <td>
            <span>{diaMes}</span>
            <span>{days[dia]} {months[mes]}</span>
          </td>
        )
      }
      
}

function escogerImagenTabla(tiempo){
    const temporal = [
      {
        valor: tiempo.values.precipitationProbabilityAvg, //Día lluvioso
        imagen: 'lluviaTabla.png'
      },
      {
        valor: tiempo.values.windSpeedAvg,              //Día ventoso
        imagen: 'vientoTabla.png'
      },
      {
        valor: tiempo.values.cloudBaseAvg,             //Día nublado
        imagen: 'nubladoTabla.png'
      }
    ];
  
    const temporalMayor = temporal.sort((a,b) => b.valor - a.valor)[0];
  
    if(temporalMayor.valor > 30){
      return temporalMayor;
    }
    else{
      return {imagen: 'soleadoTabla.png'};
    }
}

function TiempoCadaDia({temporal}){
    const {initialConfiguration} = useContext(LenguajeContext);

    function fahrenheit(grados){
      return Math.round(grados * 1.8) + 32;
  }

    return(
      <tr key={temporal.time}>
        <td>
          <div>
            <img src={escogerImagenTabla(temporal).imagen} />
            <div>
              {initialConfiguration.gradosCelsius ? <span>{Math.round(temporal.values.temperatureMax) + 'º'} </span>: <span>{fahrenheit(temporal.values.temperatureMax)} <span style={{fontSize:'15px'}}>F</span></span>}
              {initialConfiguration.gradosCelsius ? <span>{Math.round(temporal.values.temperatureMin) + 'º'} </span> : <span>{fahrenheit(temporal.values.temperatureMin)} <span style={{fontSize:'12px'}}>F</span></span>}
            </div>
          </div>
        </td>
        <td>
          <div>
            <img src='gota.png'/>
            <span>{Math.round(temporal.values.precipitationProbabilityAvg)} <span style={{fontSize:'10px'}}> %</span></span>
          </div>
        </td>
        <DiaSemana fecha={temporal.time}/>
      </tr>
    )
}

export default function PronosticoDias({weather, fahrenheit}){
    const {initialConfiguration} = useContext(LenguajeContext);

    return(
        <div className='tiempoDias'>
          <h1>{initialConfiguration.lenguaje === 'español' ? 'Pronóstico' : 'Forecast'}</h1>
          <section className='proximosDias'>
            <table className='tablaDias'>
              <tbody>
                {
                  weather.timelines.daily.map((weatherDay) => {
                    return(
                      <TiempoCadaDia temporal={weatherDay}  key={weatherDay.time}/>
                    )
                  })
                }
              </tbody>
            </table>
            </section>
        </div>
    )
}