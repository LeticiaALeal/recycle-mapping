import './Cooperativas.css';
import { getCooperativas } from '../../data/commands/Cooperativas';
import { useState, useEffect } from 'react';

export default function Cooperativas () {
    const [cooperativas, setCooperativas] = useState([]);

    useEffect(() => {
        const listCooperativas = async () => {   
            setCooperativas(await getCooperativas());
        };
        listCooperativas();
    }, []);

    return (
        <div>
         {console.log(cooperativas)}
        </div> 
     )

}