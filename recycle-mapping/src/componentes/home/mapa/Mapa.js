import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './Mapa.css';
import 'leaflet/dist/leaflet.css';


const center = [-22.90408885047777, -47.07983596717224];

export default function Mapa() {

    return (
        <div className="mapa">
            <MapContainer
                center={center}
                zoom={10}
                style={{width: '100%', height: '600px'}}  
            >
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                >
                </TileLayer>
            </MapContainer>
        </div>
       );


}