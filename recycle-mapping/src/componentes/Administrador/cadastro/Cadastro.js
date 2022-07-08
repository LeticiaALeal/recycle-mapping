import './Cadastro.scss';
import { db } from '../../../data/Firebase';
import { useState, useLocation } from 'react';
import { doc, setDoc } from 'firebase/firestore';

export default function Cadastro(Props){
  //const {state} = useLocation();
  const [cooperativa, setCooperativa] = useState({
    nome: '' ,
    endereco: '',
    latitude: '',
    longitude: '',
    qtdColaboradores: '',
    qtdRejeitos: '',
    qtdTriagem: ''
  });

  console.log(Props.location)
  //console.log(state)

  const [status, setStatus] = useState({
    type:'',
    messagem:''
  });

  const documento = cooperativa.nome + Math.random();

  const submit = async (e) => {
    e.preventDefault();
    
    await setDoc(doc(db, 'cooperativas', documento), {
      nome: cooperativa.nome,
      endereco: cooperativa.endereco,
      latitude: cooperativa.latitude,
      longitude: cooperativa.longitude,
      qtdColaboradores: cooperativa.qtdColaboradores,
      qtdRejeitos: cooperativa.qtdRejeitos,
      qtdTriagem: cooperativa.qtdTriagem
      })
      .then(function() {
        setStatus({
          type: "Sucesso",
          messagem: "Cooperativa cadastrada com sucesso!"
        });

        setCooperativa({
          nome: '',
          endereco: '',
          latitude: '',
          longitude: '',
          qtdColaboradores: '',
          qtdRejeitos: '',
          qtdTriagem: ''
        });

        alert(status.messagem);
      })
      .catch(function(e) {
        setStatus({
          type: "Erro",
          messagem: "Erro no cadastro " + e
        });

        alert(status.messagem);
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
              <label>Identificação </label>
              <input className='input-texto' 
              type="text" name="id" id="id" 
              value={documento} disabled/>    
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