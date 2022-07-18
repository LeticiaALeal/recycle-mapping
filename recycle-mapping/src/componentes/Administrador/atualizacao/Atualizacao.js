import { db } from '../../../data/Firebase';
import { collection, getDocs} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import './Atualizacao.scss';

export default function Atualizacao(){
    if (!sessionStorage.getItem('autenticado')) window.location = '/';
    
    const [cooperativas, setCooperativas] = useState([]);
    const cooperativasCollectionRef = collection(db, "cooperativas");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const dadosCooperativas = async () => {   
            const getCooperativas = await getDocs(cooperativasCollectionRef);
            const cooperativasList = getCooperativas.docs.map((doc) => ({...doc.data(), id: doc.id }));
            setCooperativas(cooperativasList);
            setTimeout(() => {
                setIsLoading(false);
              }, 2000);
        };
        dadosCooperativas();
    }, []);

    return (
        <>
        {isLoading ? <PulseLoader className='loader' color={'YellowGreen'} size={50}/> : 
            <section className="secaoAdm">
            {cooperativas.map(cooperativa => (
            
                <div className="item" >
                    <>
                        <div className="item__descricao">
                            <div className="item__titulo">
                                <h2>{cooperativa.nome}</h2>
                                <p>{"Endereço: " + cooperativa.endereco}</p>
                                <button className='editar' onClick={() => navigate(`/administrador/cadastro`, {state: {cooperativa}} )}>Editar</button>
                            </div>
                        </div>
                    </> 
                </div>   
            ))}        
        
        </section>
    }
    </>
    );

}