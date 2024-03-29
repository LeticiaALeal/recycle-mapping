import './Home.scss';
import Mapa from './mapa/Mapa';
import { getCooperativas } from '../../data/commands/CooperativasAtivas';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [cooperativas, setCooperativas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosCooperativas = async () => {   
        const cooperativasList = await (await getCooperativas()).sort(() => 0.5 - Math.random()).splice(0,3);
        setCooperativas(cooperativasList);
    };
    dadosCooperativas();
}, []);

    return (
        <>    
          <Mapa/>
          <section className='secao'>
          <div className='fotosAleatoria'>
            {cooperativas.map(item => (
              <div className='aleatoria'>
                <div className='aleatoria__imagem'>
                <img onClick={() => navigate(`/cooperativa/${item.id}`)} src={item.foto} alt={item.nome} />   
                <div className='aleatoria__titulo'>
                <h2>{item.nome}</h2>
                </div>             
                </div>                               
              </div>           
            ))}
          </div>
          </section>
        </>
      );

}
