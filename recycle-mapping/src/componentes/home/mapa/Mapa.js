import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import cooperativas from '../../../data/cooperativas.json';
import Leaflet from "leaflet";
import mapPin from '../../../assets/icon-reciclage,.svg';
import './Mapa.css';
import 'leaflet/dist/leaflet.css';


const center = [-22.91071603221728, -47.06278987880873];
let localizacaoCooperativas = [...cooperativas];
const mapPinIcon = Leaflet.icon({
    iconUrl: mapPin,
    iconSize: [20, 68],
    });

export default function Mapa() {

    return (
        <div className="mapa">
            <MapContainer
                center={center}
                zoom={12}
                style={{width: '100%', height: '600px'}}  
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"    
                />
                {localizacaoCooperativas.map(localizacao => (
                    <Marker position={[localizacao.latitude, localizacao.longitude]} icon={mapPinIcon}>
                    <Popup>
                    {localizacao.nome}
                    </Popup>
                    </Marker>
                ))}
                    

            </MapContainer>
        </div>
       );


}