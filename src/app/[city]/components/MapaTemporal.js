'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export default function MapaTemporal(){
    const position = [51.505, -0.09]

    return(
        <div className='informacionRelacionada'>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width:'100%', height:'100%', borderRadius:'40px'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>,
        </div>
    )
}