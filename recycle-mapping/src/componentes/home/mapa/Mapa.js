import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from "leaflet";
import mapPin from '../../../assets/icon-reciclage.svg';
import { db } from '../../../data/Firebase';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore'
import './Mapa.css';
import 'leaflet/dist/leaflet.css';

const center = [-22.91071603221728, -47.06278987880873];

const mapPinIcon = Leaflet.icon({
    iconUrl: mapPin,
    iconSize: [20, 68],
    });

export default function Mapa() {

    const [cooperativas, setCooperativas] = useState([]);
    const cooperativasCollectionRef = collection(db, "cooperativa");

    useEffect(() => {
        const getCooperativas = async () => {
            const data = await getDocs(cooperativasCollectionRef);
            setCooperativas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getCooperativas();
    }, []);

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

                {cooperativas.map(item => (
                    <Marker position={[item.latitude, item.longitude]} icon={mapPinIcon}>
                    <Popup>
                    {item.nome}
                    </Popup>
                    </Marker>
                ))}
                
            </MapContainer>
        </div>
       );


}