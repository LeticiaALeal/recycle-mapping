import './Login.scss';
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../data/Firebase';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = (props) => {
    const [form, setForm] = useState({
        email:'',
        senha:''
      });

      const navigate = useNavigate();

      function handleSubmit (event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, form.email, form.senha)
          .then( (userCredential) => {
            const user = userCredential.user
            sessionStorage.setItem('autenticado', true) 
            props.setIsAuth(true)                               
          })
          .catch((error) => {
            const errorMessage = error.message;
            swal("Erro!", "Falha na autenticação: \n" + errorMessage, "error");

          });        
      }

      useEffect(() => { 
          if (sessionStorage.getItem('autenticado')) navigate(`/administrador/atualizacao`);
        },);

      const renderForm = (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Usuário </label>
              <input className='input-text' type="text" 
              name="email" id="email" required 
              onChange={(e) => 
                setForm({...form, email: e.target.value})} />        
            </div>

            <div className="input-container">
              <label>Senha </label>
              <input className='input-text' type="password" 
              name="senha" id="senha" required 
              onChange={(e) => 
                setForm({...form, senha: e.target.value})}/>
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      );
    
      return (
        <div className="app">
          <div className="login-form">
            <div className="title">Login</div>
            {renderForm}
          </div>
        </div>
      );
    }

    export default Login;
