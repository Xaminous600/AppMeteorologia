'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export default function MapaTemporal({localizacion, API_KEY}){
    const position = [localizacion.lat, localizacion.lon]
    
    const zoom = 4;
    const n = 2 ^ zoom;
    const xtile = 1+ Math.round(n * ((localizacion.lon + 180) / 360))
    const ytile = 1+ Math.round(n * (1 - (Math.log(Math.tan((localizacion.lat * Math.PI)/180 ) + (1/(Math.cos((localizacion.lat*Math.PI)/180)))) / Math.PI)) / 2);
    
    return(
        <div className='informacionRelacionada'>
          <MapContainer center={position} zoom={zoom} touchZoom={false} dragging={false} zoomControl={false} scrollWheelZoom={false} style={{width:'100%', height:'100%', borderRadius:'40px'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/${zoom}/${xtile}/${ytile}.png?appid=${API_KEY}`}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

            />
            
          </MapContainer>,
        </div>
    )
}