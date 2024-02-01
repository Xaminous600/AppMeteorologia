'use client'

import './page.css'
import Image from 'next/image';
import { useContext } from 'react';
import { LenguajeContext } from './context/languajeState';

export default function Home() {
  const {initialConfiguration} = useContext(LenguajeContext);

  return (
    <main className='main'>
      <div className='textoSuperior'>
        <h1>{initialConfiguration.lenguaje === 'español' ? 'Observa. Analiza. Explora' : 'Observe. Analyze. Explore.'}</h1>
        <span>{initialConfiguration.lenguaje === 'español' ? 'La información meteorológica es una valiosa fuente de conocimiento. Con TemporaCheck, controlas qué datos deseas consultar en un instante.' : 'Weather information is a valuable source of knowledge. With TemporaCheck, you control which data you want to check in an instant.'}</span>
      </div>

      <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
        <div className='cards'>
          <div>
            <Image src='/sateliteHome.gif' alt='Imagen Salite Portada' width={140} height={140}/>
            <span>{initialConfiguration.lenguaje === 'español' ? 'Consulta todo tipo de datos meteorológicos' : 'Access all types of meteorological data.'}</span>
          </div>

          <div>
            <h1>{initialConfiguration.lenguaje === 'español' ? 'Meteorología en' : 'Real-time weather'}</h1>
            <h1>{initialConfiguration.lenguaje === 'español' ? 'Tiempo real' : 'information'}</h1>
            <span>{initialConfiguration.lenguaje === 'español' ? 'Datos meteorológicos en tiempo real para proporcionarte información precisa y actualizada' : 'Real-time meteorological data to provide you with accurate and up-to-date information'}</span>
            <Image src='/portadaNube.png' alt='Imagen Nube Portada' width={100} height={100}/>
          </div>

          <div>
            <h1>{initialConfiguration.lenguaje === 'español' ? 'En cualquier parte del mundo...' : 'Anywhere in the world...'}</h1>
            <Image src='/globoHome.gif' alt ='Imagen Globo Portada' width={160} height={160}/>
          </div>
        </div>
      </div>
      
    </main>
  );
}
