import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Pokedex from './pages/Pokedex/PokemonList';
import PokemonInfo from './pages/PokemonDetail/PokemonDetail';
import Settings from './pages/Settings/Settings';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/Custom/ProtectedRoutes';



function App() {

  const isDark = useSelector(state=>state.isDark)

  return (
    <div className={`App ${isDark?'dark':null}`} >
     <HashRouter>
       
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokedex/>}/>
            <Route path='/pokedex/:name' element={<PokemonInfo/>}/>
            <Route path='/settings' element={<Settings/>}/>
         </Route>
       </Routes>
     </HashRouter>
    </div>
  );
}

export default App;
