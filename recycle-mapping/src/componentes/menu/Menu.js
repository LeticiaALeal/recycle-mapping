import './Menu.scss'
import { Link } from 'react-router-dom';

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
        <nav className="menu">
        <ul className="menu__list">
          {mapMenu()}
        </ul>
        { !isAuth ?
          <Link to={'/administrador'}>Login</Link> :
          <a href="/" onClick={deslogar}>Deslogar</a>    
        }
      </nav>
      )

}