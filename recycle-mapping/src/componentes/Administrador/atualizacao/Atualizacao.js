import { db } from '../../../data/Firebase';
import { collection, getDocs} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Atualizacao(){
    const [cooperativas, setCooperativas] = useState([]);
    const cooperativasCollectionRef = collection(db, "cooperativas");
    const navigate = useNavigate();

    useEffect(() => {
        const dadosCooperativas = async () => {   
            const getCooperativas = await getDocs(cooperativasCollectionRef);
            const cooperativasList = getCooperativas.docs.map((doc) => ({...doc.data(), id: doc.id }));
            setCooperativas(cooperativasList);
        };
        dadosCooperativas();
    }, []);

    return (
        <section className="secao">
        {cooperativas.map(cooperativa => (
        
            <div className="item" >
                <>
                    <div className="item__descricao">
                        <div className="item__titulo">
                            <h2>{cooperativa.nome}</h2>
                            <p>{"Endereço: " + cooperativa.endereco}</p>
                            <button onClick={() => navigate(`/administrador/cadastro`, {state: {cooperativa}} )}>Editar</button>
                        </div>
                    </div>
                </> 
            </div>   
        ))}        
       
    </section>
    );

}