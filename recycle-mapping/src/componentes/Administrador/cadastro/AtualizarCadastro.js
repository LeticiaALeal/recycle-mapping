import './Cadastro.scss';
import { db, storage } from '../../../data/Firebase';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PulseLoader } from 'react-spinners';
import BasicModal from '../../modal/BasicModal';
import swal from 'sweetalert';

export default function AtualizarCadastro(){
  
  if (!sessionStorage.getItem('autenticado')) window.location = '/';

  var {state} = useLocation();
  if (state === null ) window.location = '/administrador/cadastro'
 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [cooperativa, setCooperativa] = useState({
    nome: state.cooperativa.nome,
    endereco: state.cooperativa.endereco,
    latitude: state.cooperativa.latitude,
    longitude: state.cooperativa.longitude,
    dataInicio: state.cooperativa.dataInicio,
    qtdColaboradores: state.cooperativa.qtdColaboradores,
    qtdRejeitos: state.cooperativa.qtdRejeitos,
    qtdTriagem: state.cooperativa.qtdTriagem,
    status: state.cooperativa.status,
  });

  const [imagem, setImagem] = useState();

  const cadastroImagem = async () => {
       return await uploadBytes(ref(storage, imagem.name), imagem)
      .then(async () => {
        const resultado = await getDownloadURL(ref(storage, imagem.name))
        .then((item) => { 
          return item
        })
        .catch((e) => {
          setIsLoading(false);
          swal("Erro!", "Erro ao capiturar url da imagem: \n" + e.messagem, "error");
        })
        return resultado;
  })
      .catch((e) => {
        setIsLoading(false);
        swal("Erro!", "Erro ao salvar imagem: \n" + e.messagem, "error");
      });
    }

  function cadastroCooperativa (urlImagem){
    setDoc(doc(db, 'cooperativas', state.cooperativa.id), {
      nome: cooperativa.nome,
      endereco: cooperativa.endereco,
      latitude: cooperativa.latitude,
      longitude: cooperativa.longitude,
      dataInicio: cooperativa.dataInicio,
      qtdColaboradores: cooperativa.qtdColaboradores,
      qtdRejeitos: cooperativa.qtdRejeitos,
      qtdTriagem: cooperativa.qtdTriagem,
      status: cooperativa.status,
      foto: urlImagem === undefined ? state.cooperativa.foto : urlImagem
      })
      .then(function() {
        setCooperativa({
          nome: '',
          endereco: '',
          latitude: '',
          longitude: '',
          dataInicio: '',
          qtdColaboradores: '',
          qtdRejeitos: '',
          qtdTriagem: '',
          status: true,
          foto: ''
        });
        setIsLoading(false);
        swal("Atualizado!", "Cooperativa atualizada com sucesso", "success");
        navigate(`/administrador/atualizacao`);
      })
      .catch(function(e) {
        setIsLoading(false);
        swal("Erro!", "Erro ao atualizar cooperativa: \n" + e.messagem, "error");
      });
  }

  const submit = () => {
    setIsLoading(true);
    if (imagem === null || imagem === undefined){
      cadastroCooperativa();
    } else {
      cadastroImagem().then((imagem) => {
        cadastroCooperativa(imagem)
      });
    }    
  };

    const valueInput = e => setCooperativa({ ...cooperativa, [e.target.name]: e.target.value });

    const renderForm = (
        <div className="form">
          <form onSubmit={submit}>
            <div className="container-cadastro">
            <h3 className='titulo'>Atualizar cooperativa</h3>
              <label>Nome </label><br/>
              <input className='input-texto' 
              type="text" name="nome" id="nome" maxlength="50" required 
              value={cooperativa.nome} onChange={valueInput}/>    
            </div>
            <div className="container-cadastro">
              <label>Endereço </label><br/>
              <input className='input-texto' 
              type="text" name="endereco" maxlength="70" required 
              value={cooperativa.endereco} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Latitude </label><br/>
              <input className='input-texto' 
              type="text" name="latitude" maxlength="20" required 
              value={cooperativa.latitude} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Longitude </label><br/>
              <input className='input-texto' 
              type="text" name="longitude" maxlength="20" required 
              value={cooperativa.longitude} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Início das operações </label><br/>
              <input className='input-texto' 
              type="text" name="dataInicio" maxlength="20" required 
              value={cooperativa.dataInicio} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Quantidade colaboradores </label><br/>
              <input className='input-texto' 
              type="text" name="qtdColaboradores" maxlength="20" required 
              value={cooperativa.qtdColaboradores} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Quantidade rejeitos </label><br/>
              <input className='input-texto' 
              type="text" name="qtdRejeitos" maxlength="20" required 
              value={cooperativa.qtdRejeitos} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
              <label>Quantidade triagem </label><br/>
              <input className='input-texto' 
              type="text" name="qtdTriagem" maxlength="20" required 
              value={cooperativa.qtdTriagem} onChange={valueInput}/> 
            </div>
            <div className="container-cadastro">
            <label>Status </label><br/>
            <select className='input-texto' id="status" name="status" required
            value={cooperativa.status} onChange={valueInput}>
              <option value={true}>Ativa</option>
              <option value={false}>Inativa</option>
            </select>
            </div>
            <div className="container-cadastro">
              <label>Foto </label><br/>  {
                imagem === undefined ? 
                <img className='imagemAtualizar' src={state.cooperativa.foto}></img> :
                <p>{imagem.name}</p>
              }             
             <BasicModal setImagem={setImagem} />
            </div>
            <div className="botao-container">
              <input className='input-texto' type="submit" />
            </div>
          </form>
        </div>
      );


      return (
        <>
        {isLoading ? <PulseLoader className='loader' color={'YellowGreen'} size={40}/> :
        
        <div className="tela">
          <div className="cadastro-form">
            {renderForm}
          </div>
        </div>
        }
        </>
      );

}