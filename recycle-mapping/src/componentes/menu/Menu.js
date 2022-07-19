import './Menu.scss'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-1.png';
import campinas from '../../assets/campinas00.jpg';

export default function Menu(props){

    var rotas = [{
        label: 'Home',
        to: '/'
      }, {
        label: 'Cooperativas',
        to: '/cooperativas'
      }, {
        label: 'Sobre',
        to: '/sobre'
      },{
        label: 'Administrador',
        to: '/administrador/atualizacao'
      }, {
        label: 'Cadastro',
        to: '/administrador/cadastro'
      }] 

      var isAuth = sessionStorage.getItem('autenticado');

      function mapMenu(){
        if (!isAuth){
          rotas = rotas.filter(it => !it.to.includes('/administrador'))
        }
        return rotas.map((rota, index) => (
          <li key={index} className="menu__link">
            <Link to={rota.to}>
              {rota.label}
            </Link>
          </li>
        ))
      }  

      function deslogar(){
        sessionStorage.removeItem('autenticado');
        window.location.reload();
      }

      return (
        <div>
          <img className='campinas' src={campinas} alt="campinas"/>
           <nav className="menu">
          <img className='logo' src={logo} alt="logo"/>
        <ul className="menu__list">
          {mapMenu()}
        </ul>
        { !isAuth ?
          <Link className='login' to={'/administrador'}>Login</Link> :
          <a className='login' href="/" onClick={deslogar}>Deslogar</a>    
        } 
        
      </nav>
        </div>
        
        
      )

}