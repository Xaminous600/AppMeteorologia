import './page.css'

import { getWeatherDaily, getWeatherHourly, getAirQuality } from '../services/callApiWeather';

import InformacionCiudad from './components/InformacionCiudad';
import GraficaCalidadAire from './components/GraficaCalidadAire';
import ListaPaises from './components/ListaPaises';
import TiempoCiudad from './components/TiempoCiudad';
import PronosticoDias from './components/PronosticoDias';
import dynamic from 'next/dynamic';
const MapaTemporal = dynamic(() => import("./components/MapaTemporal"), { ssr: false });

export default async function Home({params}) {

  const {city} = params;

  const weather = await getWeatherDaily(city);
  const weatherDaily = await getWeatherHourly(city);
  const airPollution = await getAirQuality(city);

  let weatherByHour = [];
  let weatherByDay =  [];
  let airPollutionDay = [];

  if(weather.timelines){
    weatherByDay = weather.timelines.daily[0].values; 
    weatherByHour = weatherDaily.timelines.hourly;
    airPollutionDay = airPollution.data;;
  }

  return (
    <main className='main'>
      {weather.timelines &&
      <div className='cuerpoSuperior'>
        <TiempoCiudad weather={weather} weatherByHour={weatherByHour} weatherByDay={weatherByDay}/>

        <div className='informacionDerechaResponsive'>
          <div className='informacionResponsive'>
            <InformacionCiudad temporal={weatherByDay}/>
           </div>
        </div>

        <PronosticoDias weather={weather}/>

        <GraficaCalidadAire airPollutionDay={airPollutionDay}/>

        <MapaTemporal localizacion={weather.location} API_KEY={process.env.REACT_APP_API_KEY_GEO}/>

        <ListaPaises weather={weather}/>
      </div>
      }
      {!weather.timelines &&
        <h1 style={{fontSize:'30px', color:'white'}}>ERROR. No se ha podido encontrar la ciudad</h1>}
    </main>
  );
}
