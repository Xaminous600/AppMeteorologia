'use client'

import { LenguajeContext } from '@/app/context/languajeState';
import { CitiesContext } from '@/app/context/citiesState';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function localizacion(ubicacion){
    const localidad = ubicacion.split(',');
  
    const ciudadPais = {
      ciudad: localidad[0],
      provincia: localidad[localidad.length-1]
    }
  
    return ciudadPais; //Primer y último elemento del array
  }
  
function añadirCiudad(weather, addCity){
    const ubicacion = localizacion(weather.location.name);
  
    addCity(
      {
        id: crypto.randomUUID(),
        city: ubicacion.ciudad,
        country: ubicacion.provincia,
        temperatureMax: Math.round(weather.timelines.daily[0].values.temperatureMax),
        temperatureMin: Math.round(weather.timelines.daily[0].values.temperatureMin),
      }
    );
}

function CiudadesFavoritas({tiempoCiudad, indice, fahrenheit}){
    const {initialConfiguration} = useContext(LenguajeContext);
  
    return(
      <Link href={`/${tiempoCiudad.city}`}>
      <div className='listaPaisesContenedor' key={tiempoCiudad.id}>
      <div>
        <div>
          <h1 style={tiempoCiudad.city.length > 10 ? {fontSize:'15px'} : {fontSize:'20px'}}>{tiempoCiudad.city}</h1>
          <h2>{tiempoCiudad.country}</h2>
        </div>
        {initialConfiguration.gradosCelsius ? <span>{tiempoCiudad.temperatureMax}º / {tiempoCiudad.temperatureMin} º</span> : <span>{fahrenheit(tiempoCiudad.temperatureMax)} F / {fahrenheit(tiempoCiudad.temperatureMin)} F</span>}
      </div>
      <div>
        {indice % 2 === 0 ?  <img src='consultarPaisImpar.png' alt='Pais Par Lista'/> : <img src='consultarPaisPar.png' alt='Pais Impar Lista'/>}
      </div>
    </div>
    </Link>
    )
  
}

function fahrenheit(grados){
    return Math.round(grados * 1.8) + 32;
  
  }

export default function ListaPaises({weather}){
    const {initialConfiguration} = useContext(LenguajeContext);
    const {arrayCitiesAdded, addCity} = useContext(CitiesContext);

    return(
        <div className='listaPaises'>
            <section className='listaPaisesAñadidos'>
            <button className='añadirPais' onClick={()=>{añadirCiudad(weather, addCity)}}>
                <div>
                <div>
                    <h1>{initialConfiguration.lenguaje === 'español' ? 'Pronóstico Mundial' : 'World Forecast'}</h1>
                    <span>{initialConfiguration.lenguaje === 'español' ? 'Añade las ciudades en las que estás interesado/a' : 'Add the cities you are interested in'}</span>
                </div>
                </div>
                <div>
                <img src='botonAdd.png' alt='Boton Añadir'/>
                </div>
            </button>

            {
                arrayCitiesAdded.map((item, index) =>{
                    return(
                    <CiudadesFavoritas tiempoCiudad={item} indice={index} fahrenheit={fahrenheit} key={item.id}/>
                    )
                })
            }
            </section>
        </div>
    )
}