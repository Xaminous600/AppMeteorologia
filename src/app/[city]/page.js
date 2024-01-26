import './page.css';
//import weather from '../../data/weather.json';
//import weatherDaily from '../../data/weatherDaily.json'; 
import { getWeatherDaily, getWeatherHourly } from '../services/callApiWeather';

function formatearHorario(horarios){
  const horario= new Date(horarios);
  let horas = 0;
  let minutos = 0;

  horario.getUTCHours()/10 >= 1 ? horas= horario.getUTCHours() : horas = '0' + horario.getUTCHours() ;
  horario.getUTCMinutes()/10 >= 1 ? minutos = horario.getUTCMinutes() : minutos = '0' + horario.getUTCMinutes() ;

  return (horas + ':' + minutos);
}

function escogerImagenNubes(porcentajeNubes){
  if(porcentajeNubes < 30){
    return ('notCloudy.png')
  }
  else if(porcentajeNubes < 60){
    return ('almostCloudy.png')
  }
  else{
    return ('cloudy.png')
  }
}

function escogerTextoNubes(porcentajeNubes){
  if(porcentajeNubes < 30){
    return 'Despejado';
  }
  else if(porcentajeNubes < 60){
    return 'Parcialmente nublado';
  }
  else{
    return 'Nublado';
  }
}

function diaSemana(fecha){
  const dia = new Date(fecha).getDay();
  const mes = new Date(fecha).getMonth();
  const diaMes = new Date(fecha).getDate();

  const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre', 'Diciembre'];

  return dias[dia] + ', ' + diaMes + ' de ' + meses[mes];
}

function localizacion(ubicacion){
  const localidad = ubicacion.split(',');

  return localidad[0] + ', ' + localidad[localidad.length-1]; //Primer y último elemento del array
}

function escogerImagenTiempo(tiempo){
  
  const temporal = [
    {
      valor: tiempo.values.precipitationProbability, //Día lluvioso
      imagen: 'lluvia.png'
    },
    {
      valor: tiempo.values.windSpeed,              //Día ventoso
      imagen: 'viento.png'
    },
    {
      valor: tiempo.values.cloudCover,             //Día nublado
      imagen: 'cloudy.png'
    }
  ];
  
  const temporalMayor = temporal.sort((a,b) => b.valor - a.valor)[0];

  if(temporalMayor.valor > 30){
    return temporalMayor;
  }
  else{
    const horarioActual = new Date(tiempo.time);

    return horarioActual.getUTCHours() >= 18 || horarioActual.getUTCHours() <= 6 ? {imagen: 'luna.png'} : {imagen: 'notCloudy.png'};
  }
}

export default async function WeatherByDay({params}) {

  const {city} =  params;

  const weather = await getWeatherDaily(city);
  const weatherDaily = await getWeatherHourly(city);

  const weatherByDay = weather.timelines.daily[0].values; 
  const weatherByHour = weatherDaily.timelines.hourly;

  return (
    <main className='main'>
      <div className='cuerpo'>
        <section className='localizacion'>
          <h1>{localizacion(weather.location.name)}</h1>
          <span>{diaSemana(weather.timelines.daily[0].time)}</span>
        </section>

        <div className='informacionClima'>
            <div className='informacionIzquierda'>
              <div style={{alignItems:'center', alignSelf:'center'}}>
                <img src= {escogerImagenNubes(weatherByDay.cloudCoverAvg)}/>
              </div>
              <div className='temperatura'>
                <h1>{Math.round(weatherByDay.temperatureAvg)}º</h1>
                <span>{escogerTextoNubes(weatherByDay.cloudCoverAvg)}</span>
              </div>
            </div>
            <div className='informacionDerecha'>
              <div>
                <h1>{Math.round(weatherByDay.humidityAvg)} %</h1>
                <span>Humedad</span>
              </div>

              <div>
                <h1>{Math.round(weatherByDay.windSpeedAvg)} km/h</h1>
                <span>Viento</span>
              </div>

              <div>
                <h1>{Math.round(weatherByDay.precipitationProbabilityAvg)} %</h1>
                <span>LLuvia</span>
              </div>
              
              <div>
                <h1>{Math.round(weatherByDay.visibilityAvg)} %</h1>
                <span>Visibilidad</span>
              </div>

              <div>
                <h1>{formatearHorario(weatherByDay.sunsetTime)}</h1>
                <span>Atardecer</span>
              </div>

            
              <div>
                <h1>{formatearHorario(weatherByDay.sunriseTime)}</h1>
                <span>Amanecer</span>
              </div>
            </div>
        </div>

        <section className='tiempoDiario'>
          {
            weatherByHour.slice(0,16).map((weatherHour) =>{
                return(
                  <div className='tiempoDiarioContenedor' key={weatherHour.time}>
                    <span>{formatearHorario(weatherHour.time)}</span>
                    <div>
                      <img src={escogerImagenTiempo(weatherHour).imagen} />
                    </div>
                    <span>{Math.round(weatherHour.values.temperature)}º</span>
                    <div>
                      <img src='gota.png'/>
                      <span>{Math.round(weatherHour.values.precipitationProbability)} %</span>
                    </div>
                  </div>
                )
            })
          }
        </section>
        
        <section className='proximosDias'>
          <table className='tablaDias'>
            <tbody>
              <tr>
                <td>
                  <span>Lunes</span>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                      <img src='gota.png'/>
                      <span>5 %</span>
                  </div>
                </td>
                <td>
                  <div>
                    <img src='sunny.png'/>
                  </div>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                    <span>20º</span>
                    <span>10º</span>
                    <img src='temperatura.png'/>
                  </div>
                </td>
                <img src='redirigir.png'/>
              </tr>

              <tr>
                <td>
                  <span>Miércoles</span>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                      <img src='gota.png'/>
                      <span>5 %</span>
                  </div>
                </td>
                <td>
                  <div>
                    <img src='sunny.png'/>
                  </div>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                    <span>20º</span>
                    <span>10º</span>
                    <img src='temperatura.png'/>
                  </div>
                </td>
                <img src='redirigir.png'/>
              </tr>

              <tr>
                <td>
                  <span>Lunes</span>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                      <img src='gota.png'/>
                      <span>5 %</span>
                  </div>
                </td>
                <td>
                  <div>
                    <img src='sunny.png'/>
                  </div>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                    <span>20º</span>
                    <span>10º</span>
                    <img src='temperatura.png'/>
                  </div>
                </td>
                <img src='redirigir.png'/>
              </tr>

              <tr>
                <td>
                  <span>Lunes</span>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                      <img src='gota.png'/>
                      <span>5 %</span>
                  </div>
                </td>
                <td>
                  <div>
                    <img src='sunny.png'/>
                  </div>
                </td>
                <td>
                  <div style={{display:'flex'}}>
                    <span>20º</span>
                    <span>10º</span>
                    <img src='temperatura.png'/>
                  </div>
                </td>
                <img src='redirigir.png'/>
              </tr>

            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
