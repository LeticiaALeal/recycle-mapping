import './Login.scss';
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email:'',
        senha:''
      });

      const auth = getAuth();
      const navigate = useNavigate();

      function handleSubmit () {
        signInWithEmailAndPassword(auth, form.email, form.senha)
          .then( sessionStorage.setItem('autenticado', true) )
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
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
