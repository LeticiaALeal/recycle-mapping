import './Menu.scss'
import { Link } from 'react-router-dom';

export default function Menu(){
    const rotas = [{
        label: 'Home',
        to: '/'
      }, {
        label: 'Cooperativas',
        to: '/cooperativas'
      }, {
        label: 'Sobre',
        to: '/sobre'
      }];

      return (
        <nav className="menu">
        <ul className="menu__list">
          {rotas.map((rota, index) => (
            <li key={index} className="menu__link">
              <Link to={rota.to}>
                {rota.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      )

}