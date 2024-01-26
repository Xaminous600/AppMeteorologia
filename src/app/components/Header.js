'use client'

import Link from 'next/link';
import './Header.css';
import { useState } from 'react';

export default function Header(){
    const [search, setSearch] = useState('');
    return (
        <header className='header'>
            <nav className='navegacion'>
                <div className='formulario'>
                    <form>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Cádiz, Madrid, Alicante..."
                                value={search}
                                onChange={(e) => {setSearch(e.target.value)}}
                            />

                            <Link href={`/${search}`}>
                                <button type="submit">
                                    <img src="lupa.png" alt="Buscar"/>
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
                
            </nav>
        </header>
    )
}