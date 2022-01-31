import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Pokemon from '../../components/PokemonList/Pokemon/PokemonInfo';
import './PokemonList.styles.css';

const Pokedex = () => {
    const navigate = useNavigate();

    const apperance = useSelector(state => state.apperance)
    const name = useSelector(state=>state.name);
    const itemsPage = useSelector(state=>state.itemsPage)
    const [pokemons, setPokemons] = useState([]);
    const [allOption, setAllOption] = useState([]);
    const [typeSelected, setTypeSelected] = useState('all');
    const [page, setPage]=useState(1);
    const [types, setTypes] = useState({});
    const [searchPokemon, setSearchPokemon] = useState("");
    
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    },[page])
   
    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1200')
             .then(res=>{setPokemons(res.data.results)
                         setAllOption(res.data.results)})
    },[])

    
    const arrayPages=[]

     for (let i = 0; i < Math.ceil(pokemons.length/itemsPage); i++) {
         arrayPages.push(i+1) 
     }
    
    const lastIndex = page*itemsPage
    const firtIndex = lastIndex - itemsPage
    const paginatedPokemons = pokemons.slice(firtIndex, lastIndex)


    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/type/')
             .then(res=>setTypes(res.data))
    }, [])


    const filterTypes = (type)=>{
        setPage(1)
        if(type==="all"){
            setPokemons(allOption) 
            setTypeSelected(type)
        }else{
            axios.get(`https://pokeapi.co/api/v2/type/${type}`)
                 .then(res => setPokemons(res.data.pokemon.map(type=>({name: type.pokemon.name, url: type.pokemon.url}))))
            
            setTypeSelected(type)
        }  
    }

    const submit = (e)=>{
        e.preventDefault();
        navigate(`/pokedex/${searchPokemon}`)
    }

     const [last, setLast] = useState(9)
     const [first, setFirst] = useState(0)

     const changeArrayPages = (page)=>{
        if(arrayPages.length > 9 && page > 5){
            setLast(page+4) 
            setFirst(page-5)
            
        }else{
            setLast(9) 
            setFirst(0)
        }
        
     }
  
     const changePagesNext = ()=>{
         setPage(page+5)
         changeArrayPages(page+5) 
     } 

     const changePagesPrev = ()=>{
         setPage(page-5)
         changeArrayPages(page-5)
     }

     const newArrayPages = arrayPages.slice(first, last)
     const [isChecked, setIsChecked] = useState(false)

    return (
        <div className='pokedex-container'>

            <div className='image-rotate'></div>
            <div className='name'>
                <div> <img src={apperance} alt="" /> </div>
                <div>
                    <h1>Pokedex</h1>
                    <p>Welcome {name}!</p>  
                </div> 
            </div>
            
            <div className='button'>
                <h2>types</h2>
                <input type="checkbox" id='btn-switch'onChange={e=>setIsChecked(e.target.checked)} value={isChecked}/>
                <label htmlFor="btn-switch" className='lbl-switch' ></label> 
                <h2>pokemon</h2>
            </div>

            <div className='input'>
                {   
                    !isChecked && (<select onChange={e=>filterTypes(e.target.value)} defaultValue={typeSelected} > 
                                        <option value="all"  className='option'>all pokemons</option>
                                        {
                                            types.results?.map(type=><option value={type.name} key={type.name}>{type.name}</option>)
                                        }
                                  </select>)
                }
               
                {
                    isChecked && (<form onSubmit={submit}>
                                    <input type="text" value={searchPokemon} onChange={e=>setSearchPokemon(e.target.value)} placeholder='find a pokemon'/>
                                  </form>)
                }

            </div>

            <div className='pokemon-list'>   
                    {
                        paginatedPokemons.map(pokemon=>( <Pokemon key={pokemon.name} 
                                                                  url={pokemon.url}
                                                                  name={pokemon.name}
                                                         />))
                        
                    }
            </div>              
            
            

            <div className='buttons'>
                {   
                    
                    page > 5 && <button onClick={changePagesPrev}><i className="fas fa-arrow-left"></i></button>
                }   
                {
                    newArrayPages.map(numberPage => (<button key={numberPage} 
                                                            onClick={()=>{setPage(numberPage)
                                                                          changeArrayPages(numberPage)}} 
                                                            style={numberPage === page ? {backgroundColor: 'rgb(15, 92, 134)'}:null}>
                                                            {numberPage} 
                                                     </button>))
                } 
                {   
                    arrayPages.length > 9 && page+5 < arrayPages.length &&<button onClick={changePagesNext}><i className="fas fa-arrow-right"></i></button>
                } 
            </div>       

            <Link to='/settings'>
                <button className='settings'><i className="fas fa-cog fa-2x"></i></button>
            </Link>
            
        </div>
    );
}; 

export default Pokedex;