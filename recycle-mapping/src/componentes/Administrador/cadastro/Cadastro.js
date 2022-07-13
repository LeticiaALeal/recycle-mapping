import './Cadastro.scss';
import { db } from '../../../data/Firebase';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore';

export default function Cadastro(){
  var {state} = useLocation();
  const [cooperativa, setCooperativa] = useState({
    nome: state === null ? '' : state.cooperativa.nome,
    endereco: state === null ? '' : state.cooperativa.endereco,
    latitude: state === null ? '' : state.cooperativa.latitude,
    longitude: state === null ? '' : state.cooperativa.longitude,
    qtdColaboradores: state === null ? '' : state.cooperativa.qtdColaboradores,
    qtdRejeitos: state === null ? '' : state.cooperativa.qtdRejeitos,
    qtdTriagem: state === null ? '' : state.cooperativa.qtdTriagem,
    status: state === null ? true : state.cooperativa.status
  });

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    
     setDoc(doc(db, 'cooperativas', state === null ? String(Math.random()) : state.cooperativa.id), {
      nome: cooperativa.nome,
      endereco: cooperativa.endereco,
      latitude: cooperativa.latitude,
      longitude: cooperativa.longitude,
      qtdColaboradores: cooperativa.qtdColaboradores,
      qtdRejeitos: cooperativa.qtdRejeitos,
      qtdTriagem: cooperativa.qtdTriagem,
      status: cooperativa.status
      })
      .then(function() {
        setCooperativa({
          nome: '',
          endereco: '',
          latitude: '',
          longitude: '',
          qtdColaboradores: '',
          qtdRejeitos: '',
          qtdTriagem: '',
          status: true
        });
        alert("Atualização inserida com sucesso!");
        navigate(`/administrador/atualizacao`);
      })
      .catch(function(e) {
        alert("Erro na atualização: " + e.messagem);
      });
    };

    const valueInput = e => setCooperativa({ ...cooperativa, [e.target.name]: e.target.value });

    const renderForm = (
        <div className="form">
          <form>
            <div className="container-cadastro">
              <label>Nome </label>
              <input className='input-texto' 
              type="text" name="nome" id="nome" required 
              value={cooperativa.nome} onChange={valueInput}/>    
            </div>
            <div className="container-cadastro">
              <label>Endereço </label>
              <input className='input-texto' 
              type="text" name="endereco" required 
              value={cooperativa.endereco} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Latitude </label>
              <input className='input-texto' 
              type="text" name="latitude" required 
              value={cooperativa.latitude} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Longitude </label>
              <input className='input-texto' 
              type="text" name="longitude" required 
              value={cooperativa.longitude} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Quantidade colaboradores </label>
              <input className='input-texto' 
              type="text" name="qtdColaboradores" required 
              value={cooperativa.qtdColaboradores} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Quantidade rejeitos </label>
              <input className='input-texto' 
              type="text" name="qtdRejeitos" required 
              value={cooperativa.qtdRejeitos} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Quantidade triagem </label>
              <input className='input-texto' 
              type="text" name="qtdTriagem" required 
              value={cooperativa.qtdTriagem} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
            <label>Status </label>
            <select className='input-texto' id="status" name="status" 
            value={cooperativa.status} onChange={valueInput}>
              <option value={true}>Ativa</option>
              <option value={false}>Inativa</option>
            </select>
            </div>
            {/* <div className="container-cadastro">
              <label>Foto </label>
              <input className='input-texto' type="file" name="foto" accept="image/png, image/jpeg" required /> 
            </div> */}
            <div className="botao-container">
              <input className='input-texto' type="submit" onClick={submit}/>
            </div>
          </form>
        </div>
      );

      return (
        <div className="tela">
          <div className="cadastro-form">
            <div className="titulo">Cadastro da cooperativa</div>
            {renderForm}
          </div>
        </div>
      );

}