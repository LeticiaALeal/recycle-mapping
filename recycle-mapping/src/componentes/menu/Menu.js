import './Menu.scss'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-1.png';
import campinas from '../../assets/campinas00.jpg';
import { getAuth, signOut } from "firebase/auth";
import { Component, useState } from 'react';
import swal from 'sweetalert';
import Login from '../Administrador/login/Login';


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

      const auth = getAuth();

      function mapMenu(){
        if (!props.isAuth){
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
        signOut(auth).then(() => {
          sessionStorage.removeItem('autenticado');
          window.location.reload();
        }).catch((error) => {
          swal("Erro!", "Falha ao deslogar: \n" + error.message, "error");
        });
        
      }

      return (
        <div>
          <img className='campinas' src={campinas} alt="campinas"/>
           <nav className="menu">
          <a href="/"><img className='logo' src={logo} alt="logo"/></a>
        <ul className="menu__list">
          {mapMenu()}
        </ul>
        { !props.isAuth ?
          <Link className='login' to={'/administrador'}>Login</Link> :
          <a className='login' href="/" onClick={deslogar}>Deslogar</a>    
        } 
        
      </nav>
        </div>
        
        
      )

}