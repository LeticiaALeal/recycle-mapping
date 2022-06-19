import { useParams } from 'react-router-dom';
import './Detalhes.css';
import { getCooperativas } from '../../data/commands/Cooperativas';
import { useState, useEffect } from 'react';

export default function Detalhes () {
    const { id } = useParams();
    const [cooperativas, setCooperativas] = useState([]);

    useEffect(() => {
        const listCooperativas = async () => {   
            setCooperativas(await getCooperativas());
        };
        listCooperativas();
    }, []);

    return (
       <div>
        {console.log(cooperativas.find(item => item.id === id))}
       </div> 
    )
    


}

