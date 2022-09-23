import './Rodape.scss';
import logo from '../../assets/logo-1-black.png';

export default function Rodape(){
    return (
        <footer className='footer'>
            <p className='licenca'>Copyright © 2022 - Desenvolvido por Letícia de Araújo Leal</p>
            <div> 
            <a href="/"><img className='logo' src={logo} alt="logo"/></a>
            </div>
        </footer>
    )
}