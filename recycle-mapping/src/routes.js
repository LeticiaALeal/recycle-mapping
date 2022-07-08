import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './componentes/home/Home';
import Sobre from './componentes/sobre/Sobre';
import Detalhes from './componentes/detalhes/Detalhes';
import Cooperativas from './componentes/cooperativas/Cooperativas';
import Menu from './componentes/menu/Menu';
import Rodape from './componentes/rodape/Rodape';
import Login from './componentes/Administrador/login/Login';
import Cadastro from './componentes/Administrador/cadastro/Cadastro';
import Remocao from './componentes/Administrador/remocao/Remocao';

export default function AppRouter(){
    return (
        <main>
            <Router>
                <Routes>
                    <Route path='/administrador' element={<Login/>}/>
                    <Route path='/administrador/cadastro' element={<Cadastro/>}/>
                    <Route path='/administrador/remocao' element={<Remocao/>}/>
                </Routes>
            </Router>
            <Router>
                {'a' != 'a' ?
            <Menu /> : null}
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/cooperativa/:id' element={<Detalhes/>}/>
                    <Route path='/cooperativas' element={<Cooperativas/>}/>
                    <Route path='/sobre' element={<Sobre />}/>
                </Routes>
                <Rodape/>
            </Router>
        </main>
    );
}