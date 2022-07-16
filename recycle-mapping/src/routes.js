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
  
export default function AppRouter(){
    return (
        <main>
            <Router>
            <Menu/>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/cooperativa/:id' element={<Detalhes/>}/>
                    <Route path='/cooperativas' element={<Cooperativas/>}/>
                    <Route path='/sobre' element={<Sobre />}/>
                    <Route path='/administrador' element={<Login/>}/>
                    <Route path='/administrador/cadastro' element={<Cadastro/>}/>
                    <Route path='/administrador/atualizacao' element={<Atualizacao/>}/> 
                </Routes>
                <Rodape/>
            </Router>            
        </main>
    );
}