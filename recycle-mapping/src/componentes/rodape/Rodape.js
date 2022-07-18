import './Rodape.scss';
import logo from '../../assets/logo-1.png';

export default function Rodape(){
    return (
        <footer className='footer'>
            <div>
            <img className='logo' src={logo} alt="logo"/>
            </div>
        </footer>
    )
}