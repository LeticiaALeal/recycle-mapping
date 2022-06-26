import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './componentes/home/Home';
import Sobre from './componentes/sobre/Sobre';
import Detalhes from './componentes/detalhes/Detalhes';
import Cooperativas from './componentes/cooperativas/Cooperativas';
import Menu from './componentes/menu/Menu';

export default function AppRouter(){
    return (
        <main>
            <Router>
                <Menu />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/cooperativa/:id' element={<Detalhes/>}/>
                    <Route path='/cooperativas' element={<Cooperativas/>}/>
                    <Route path='/sobre' element={<Sobre />}/>
                </Routes>
            </Router>
        </main>
    );
}