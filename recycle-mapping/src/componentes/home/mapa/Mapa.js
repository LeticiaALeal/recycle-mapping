import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from "leaflet";
import mapPin from '../../../assets/icon-reciclage.svg';
import { useState, useEffect } from 'react';
import { getCooperativas } from '../../../data/commands/CooperativasAtivas';
import { useNavigate } from 'react-router-dom';
import './Mapa.scss';
import 'leaflet/dist/leaflet.css';

const center = [-22.91071603221728, -47.06278987880873];

const mapPinIcon = Leaflet.icon({
    iconUrl: mapPin,
    iconSize: [20, 68],
    });

export default function Mapa() {
    const [cooperativas, setCooperativas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const listCooperativas = async () => {    
            setCooperativas(await getCooperativas());
        };
        listCooperativas();
    }, []);

    return (
        <div className="mapa">
            <MapContainer
                center={center}
                zoom={12}
                style={{width: '100%', height: '620px'}}  
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"    
                />

                {cooperativas.map(item => (
                   <div
                   onClick={() => navigate(`/cooperativa/${item.id}`)}
                   >
                    <Marker position={[item.latitude, item.longitude]} icon={mapPinIcon} >
                    <Popup>
                    {<img src={item.foto} alt="foto da cooperativa" height="150px" width="250px" />}<br />
                    {"Cooperativa "+ item.nome}<br />
                    {item.endereco}
                    </Popup>
                    </Marker>
                    </div> 
                ))
                }
                
            </MapContainer>
        </div>
       );
}