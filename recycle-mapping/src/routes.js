import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './componentes/home/Home';
import Sobre from './componentes/sobre/Sobre';
import Detalhes from './componentes/detalhes/Detalhes';
import Cooperativas from './componentes/cooperativas/Cooperativas';
import Menu from './componentes/menu/Menu';
import Rodape from './componentes/rodape/Rodape';
import Login from './componentes/Administrador/login/Login';
import Cadastro from './componentes/Administrador/cadastro/Cadastro';
import Atualizacao from './componentes/Administrador/atualizacao/Atualizacao';
import AtualizarCadastro from './componentes/Administrador/cadastro/AtualizarCadastro';
import { useState } from 'react';
  
export default function AppRouter(){
    const [isAuth, setIsAuth] = useState(sessionStorage.getItem('autenticado'));
    return (
        <main>          
            <Router>
            <Menu isAuth={isAuth}/>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/cooperativa/:id' element={<Detalhes/>}/>
                    <Route path='/cooperativas' element={<Cooperativas/>}/>
                    <Route path='/sobre' element={<Sobre />}/>
                    <Route path='/administrador' element={<Login setIsAuth={setIsAuth}/>}/>
                    <Route path='/administrador/cadastro' element={<Cadastro/>}/>
                    <Route path='/administrador/atualizar' element={<AtualizarCadastro/>}/>
                    <Route path='/administrador/atualizacao' element={<Atualizacao/>}/> 
                </Routes>
                <Rodape/>
            </Router>            
        </main>
    );
}