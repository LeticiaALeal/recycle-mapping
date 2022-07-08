import './Cooperativas.scss';
import { getCooperativas } from '../../data/commands/Cooperativas';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cooperativas () {
    const [cooperativas, setCooperativas] = useState([]);
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();

    function executaBusca(title){
        const regex = new RegExp(busca, 'i');
        return regex.test(title);
    }

    useEffect(() => {
        const dadosCooperativas = async () => {   
            const cooperativasList = await (await getCooperativas()).filter(item => executaBusca(item.nome));
            setCooperativas(cooperativasList);
        };
        dadosCooperativas();
    }, []);

    return (
    <section className="secao">
        <input 
         value={busca}
         onChange={(evento) => setBusca(evento.target.value)}
         placeholder="Buscar"/>
        {cooperativas.map(cooperativa => (
            <div className="item"
            onClick={() => navigate(`/cooperativa/${cooperativa.id}`)}
            >
                <>
                    <div className="item__imagem">
                        <img src={cooperativa.foto} alt={"cooperativa " + cooperativa.nome}/>
                    </div>
                    <div className="item__descricao">
                        <div className="item__titulo">
                            <h2>{cooperativa.nome}</h2>
                            <p>{cooperativa.rua + ", " + cooperativa.bairro}</p>
                            <p>{cooperativa.triagem + " toneladas por mês de tragem" }</p>
                        </div>
                    </div>
                </> 
            </div>   
        ))}        
       
    </section>
     );

}