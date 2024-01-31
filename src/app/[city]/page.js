import './page.css'

import { getWeatherDaily, getWeatherHourly, getAirQuality } from '../services/callApiWeather';

import InformacionCiudad from './components/InformacionCiudad';
import GraficaCalidadAire from './components/GraficaCalidadAire';
import ListaPaises from './components/ListaPaises';
import TiempoCiudad from './components/TiempoCiudad';
import PronosticoDias from './components/PronosticoDias';
import MapaTemporal from './components/MapaTemporal';

export default async function Home({params}) {

  const {city} = params;

  const weather = await getWeatherDaily(city);
  const weatherDaily = await getWeatherHourly(city);
  const airPollution = await getAirQuality(city);

  const weatherByDay = weather.timelines.daily[0].values; 
  const weatherByHour = weatherDaily.timelines.hourly;
  const airPollutionDay = airPollution.data;;

  return (
    <main className='main'>
      <div className='cuerpoSuperior'>
        <TiempoCiudad weather={weather} weatherByHour={weatherByHour} weatherByDay={weatherByDay}/>

        <div className='informacionDerechaResponsive'>
          <div className='informacionResponsive'>
            <InformacionCiudad temporal={weatherByDay}/>
           </div>
        </div>

        <PronosticoDias weather={weather}/>

        <GraficaCalidadAire airPollutionDay={airPollutionDay}/>

        <MapaTemporal/>

        <ListaPaises weather={weather}/>
      </div>
    </main>
  );
}
