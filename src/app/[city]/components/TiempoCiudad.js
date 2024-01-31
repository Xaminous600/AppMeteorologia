import InformacionCiudad from './InformacionCiudad';

function localizacion(ubicacion){
    const localidad = ubicacion.split(',');
  
    const ciudadPais = {
      ciudad: localidad[0],
      provincia: localidad[localidad.length-1]
    }
  
    return ciudadPais; //Primer y último elemento del array
}

function escogerImagenSuperior(tiempo){
    const temporal = [
      {
        valor: tiempo.values.precipitationProbabilityAvg, //Día lluvioso
        imagen: 'lluviaSuperior.png'
      },
      {
        valor: tiempo.values.windSpeedAvg,              //Día ventoso
        imagen: 'vientoSuperior.png'
      },
      {
        valor: tiempo.values.cloudBaseAvg,             //Día nublado
        imagen: 'nubladoSuperior.png'
      }
    ];
  
    const temporalMayor = temporal.sort((a,b) => b.valor - a.valor)[0];
  
    if(temporalMayor.valor > 30){
      return temporalMayor;
    }
    else{
      return {imagen: 'soleadoSuperior.png'};
    }
}

function TiempoCadaHora({temporal}){
    return(
      <div className='tiempoDiarioContenedor' key={temporal.time}>
        <span>{formatearHorario(temporal.time)}</span>
        <div>
          <img src={escogerImagenTiempoDiario(temporal).imagen} />
        </div>
        <span>{Math.round(temporal.values.temperature)}º</span>
        <div>
          <img src='gota.png'/>
          <span>{Math.round(temporal.values.precipitationProbability)} %</span>
        </div>
      </div>
    )
}

function formatearHorario(horarios){
    const horario= new Date(horarios);
    let horas = 0;
    let minutos = 0;
  
    horario.getUTCHours()/10 >= 1 ? horas= horario.getUTCHours() : horas = '0' + horario.getUTCHours() ;
    horario.getUTCMinutes()/10 >= 1 ? minutos = horario.getUTCMinutes() : minutos = '0' + horario.getUTCMinutes() ;
  
    return (horas + ':' + minutos);
}

function escogerImagenTiempoDiario(tiempo){
  
    const temporal = [
      {
        valor: tiempo.values.precipitationProbability, //Día lluvioso
        imagen: 'lluviaDiario.png'
      },
      {
        valor: tiempo.values.windSpeed,              //Día ventoso
        imagen: 'vientoDiario.png'
      },
      {
        valor: tiempo.values.cloudBase,             //Día nublado
        imagen: 'nubladoDiario.png'
      }
    ];
    
    const temporalMayor = temporal.sort((a,b) => b.valor - a.valor)[0];
  
    if(temporalMayor.valor > 30){
      return temporalMayor;
    }
    else{
      const horarioActual = new Date(tiempo.time);
  
      return horarioActual.getUTCHours() >= 18 || horarioActual.getUTCHours() <= 6 ? {imagen: 'lunaDiario.png'} : {imagen: 'soleadoDiario.png'};
    }
}

export default function TiempoCiudad({weather, weatherByHour, weatherByDay}){
    return(
        <div className='tiempoZona'>
            <div className='tiempoZonaSuperior'>
                <div className='informacionIzquierda'>
                <div style={{alignItems:'center', alignSelf:'center'}}>
                    <img src= {escogerImagenSuperior(weather.timelines.daily[0]).imagen}/>
                </div>
                
                <section className='localizacion'>
                    <h1>{localizacion(weather.location.name).ciudad}</h1>
                    <span>{localizacion(weather.location.name).provincia}</span>
                </section>
                </div>

                <div className='informacionDerecha'>
                <InformacionCiudad temporal={weatherByDay}/>
                </div>
            
            </div>
            <section className='tiempoDiario'>
                {
                weatherByHour.slice(0,16).map((weatherHour) =>{
                    return(
                        <TiempoCadaHora temporal={weatherHour} key={weatherHour.time}/>
                    )
                })
                }
            </section>
      </div>
    )
}