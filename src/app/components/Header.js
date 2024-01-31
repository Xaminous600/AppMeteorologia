'use client'

import Link from 'next/link';
import './Header.css';
import { useState, useContext } from 'react';
import { LenguajeContext } from '../context/languajeState';
import Image from 'next/image';

function obtenerTiempo(lenguaje){
    const fecha = new Date();

    const dias = ['Dom,','Lun,','Mar,','Miérc,','Juev,','Vier,','Sáb,'];
    const meses= ['En,','Febr,','Mar,','Abr,','May,','Jun,','Jul,','Ag,','Sept,','Oct,','Nov,', 'Dic,'];

    const days = ['Sun,','Mon,','Tues,','Wed,','Thurs,','Fri,','Sat,'];
    const months = ['Jan,','Feb,','Mar,','Apr,','May,','Jun,','Jul,','Aug,','Sept,','Oct,','Nov,', 'Dec,'];

    const dia = new Date(fecha).getDay();
    const mes = new Date(fecha).getMonth();

    if(lenguaje === 'español'){
        return (dias[dia] + ' ' +fecha.getDate() + ' ' + meses[mes] + ' ' + fecha.getFullYear());
    }
    else{
        return (days[dia] + ' ' +fecha.getDate() + ' ' + months[mes] + ' ' + fecha.getFullYear());
    }
}

export default function Header(){
    const { initialConfiguration, changeLanguaje, changeGrados } = useContext(LenguajeContext);
    const [search, setSearch] = useState('');

    return (
        <header className='header'>
            <nav className='navegacion'>
                <div>
                    <Link href='/'>
                        <Image src='/weatherLogo.png' alt='Weather Logo' width={50} height={50}/>
                    </Link>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <h1 style={{fontStyle:'italic'}}>TemporaCheck</h1>
                        <span style={{fontSize:'15px', fontWeight:'300'}}>{obtenerTiempo(initialConfiguration.lenguaje)}</span>
                    </div>
                </div>
                <div>
                    <form>
                        <div>
                            <input 
                                placeholder= {initialConfiguration.lenguaje === 'español' ? 'Buscar ciudad...' : 'Search city...'}
                                type='text'
                                style={{color:'white'}}
                                onChange={(event)=>{setSearch(event.target.value)}}
                            />
                            
                            <Link href={`/${search}`}>
                                <button type="submit">
                                    <Image src="/lupa.png" alt="Buscar" width={18} height={18}/>
                                </button>
                            </Link>
                        </div>
                    </form>
                    
                    <div>
                        <select onChange={(event)=>{changeLanguaje(event.target.value)}}>
                            <option value='español'>ESP</option>
                            <option value='english'>ENG</option>
                        </select>

                        <div>
                            <button className={initialConfiguration.gradosCelsius ? 'seleccionMedidaTemperatura' : null} onClick={()=>{changeGrados(true)}}>
                                Cº
                            </button>
                            <button className={initialConfiguration.gradosCelsius ? null : 'seleccionMedidaTemperatura'} onClick={()=>{changeGrados(false)}}>
                                Fº
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}