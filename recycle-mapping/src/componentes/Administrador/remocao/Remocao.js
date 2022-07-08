import { db } from './../../../data/Firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Remocao(){
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

    const deleteDocument = async (id) => {
        await deleteDoc(doc(db, 'cooperativas', id))
    }


    return (
        <section className="secao">
        {cooperativas.map(cooperativa => (
        
            <div className="item" >
                <>
                    <div className="item__descricao">
                        <div className="item__titulo">
                            <h2>{cooperativa.id}</h2>
                            <p>{cooperativa.nome + " "}{ " - " + cooperativa.endereco}</p>
                            <button onClick={() => deleteDocument(cooperativa.id)}>Deletar</button>
                            <button onClick={() => navigate(`/administrador/cadastro`, {cooperativa:cooperativa} )}>Editar</button>
                        </div>
                    </div>
                </> 
            </div>   
        ))}        
       
    </section>
    );

}