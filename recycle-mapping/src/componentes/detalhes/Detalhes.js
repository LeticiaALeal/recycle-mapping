import './Detalhes.scss';
import { useParams } from 'react-router-dom';
import { getCooperativas } from '../../data/commands/Cooperativas';
import { useState, useEffect } from 'react';
import point from '../../assets/icon-pointer.png';
import calendario from '../../assets/icon-calendar.png';
import reciclagem from '../../assets/icon-simbolo-de-reciclagem.png';
import lixo from '../../assets/icon-lixo.png';
import pessoas from '../../assets/icon-pessoas.png';
import { PulseLoader } from 'react-spinners';

export default function Detalhes () {
    const { id } = useParams();
    const [cooperativa, setCooperativa] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const dadosCooperativa = async () => {   
            setCooperativa((await getCooperativas()).find(item => item.id === id));
            setTimeout(() => {
                setIsLoading(false);
              }, 1500);
        };
        dadosCooperativa();
    }, []);

    return (
        <div>
        {isLoading ? <PulseLoader className='loader' color={'YellowGreen'} size={40}/> :
            <section className="container">
                <div className="imagemDetalhe">
                    <img src={cooperativa.foto} alt={"cooperativa " + cooperativa.nome}/>
                </div>
                <div className="descriptionDetalhe">
                    <h2>{"Cooperativa " + cooperativa.nome}</h2>

                    <p><img className='icon' src={point} alt="icon"/>
                    {cooperativa.rua + ", " + cooperativa.bairro}</p>

                    <p><img className='icon' src={calendario} alt="icon"/>
                    {"Início das operações na " + cooperativa.inicio}</p>

                    <p><img className='icon' src={reciclagem} alt="icon"/>
                    {cooperativa.triagem + " toneladas de triagem realizadas por mês"}</p>

                    <p><img className='icon' src={lixo} alt="icon"/>
                    {cooperativa.rejeitos + " toneladas de rejeitos produzidos por mês"}</p>

                    <p><img className='icon' src={pessoas} alt="icon"/>
                    {"Possuí " + cooperativa.colaboradores + " colaboradores"}</p>
                </div>
            </section> 
        }
       </div>
       
    )
    


}
