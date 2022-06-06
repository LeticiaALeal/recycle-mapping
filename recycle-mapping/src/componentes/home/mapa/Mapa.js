import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from "leaflet";
import mapPin from '../../../assets/icon-reciclage.svg';
import { db } from '../../../data/Firebase';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import './Mapa.css';
import 'leaflet/dist/leaflet.css';

const center = [-22.91071603221728, -47.06278987880873];

const mapPinIcon = Leaflet.icon({
    iconUrl: mapPin,
    iconSize: [20, 68],
    });

    function getReferanceData(getList, ref){ 
        return getList.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        .find(it => it.id === ref)
    }     

export default function Mapa() {

    const [cooperativas, setCooperativas] = useState([]);
    const cooperativasCollectionRef = collection(db, "cooperativa");
    const enderecoCollectionRef = collection(db, "endereco");
    const bairroCollectionRef = collection(db, "bairro");

    useEffect(() => {
        const getCooperativas = async () => {
            const getCooperativas = await getDocs(cooperativasCollectionRef)
            const getEndereco = await getDocs(enderecoCollectionRef)
            const getBairro = await getDocs(bairroCollectionRef)

            const cooperativasList = getCooperativas.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
           
                const cooperativaObject = cooperativasList.map(it => {
                    const endereco = getReferanceData(getEndereco, it.idEndereco.id);
                    return it = {
                        nome: it.nome,
                        latitude: it.latitude,
                        longitude: it.longitude,                        
                        rua: endereco.rua,
                        bairro: getReferanceData(getBairro, endereco.idBairro.id).bairro,
                        numero: endereco.numero
                    }});
            
            setCooperativas(cooperativaObject);
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
                    {"Cooperativa "+ item.nome}<br />
                    {item.rua + ", "} {item.numero}<br />
                    {item.bairro}<br />
                    </Popup>
                    </Marker>
                ))}
                
            </MapContainer>
        </div>
       );


}