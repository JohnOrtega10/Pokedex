import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './PokemonDetail.styles.css'
import ProgressBar from '../../components/PokemonDetail/ProgressBar/ProgressBar';

import {colorsBackground, iconsBackground, iconsTypes} from '../../colors'



const PokemonInfo = () => {

    const {name} = useParams();
    const [pokemonDetail, setPokemonDetail ] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo({top:0})
    },[])

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
             .then(res=>setPokemonDetail(res.data))
        
    },[name])


    return ( 
        <div className='detail-container' > 
            <button onClick={()=>navigate(-1)}> <i className="fas fa-arrow-circle-left fa-4x"></i></button>
            <div className='principal-container'>
                <div className='principal'style={{backgroundColor: colorsBackground[pokemonDetail.types?.[0].type.name]}}>
                    <img src={pokemonDetail.sprites?.other['official-artwork'].front_default} alt="Pokemon" />
                     
                    <h1>{name} N°{pokemonDetail.id}</h1> 
                    <div className='types'>
                            {
                                pokemonDetail.types?.map(pokemon=>(<div style={{backgroundColor: iconsBackground[pokemon.type.name]}} 
                                                                        key={pokemon.type.name}>
                                                                            {iconsTypes[pokemon.type.name]}
                                                                       <p>{pokemon.type.name} </p>
                                                                   </div>))
                            }
                    </div>
                </div>
               <div className='dimensions'>
                    <div style={{backgroundColor: colorsBackground[pokemonDetail.types?.[0].type.name]}}>
                        <h2>Dimensions</h2>
                        <div className='height'>
                            <p style={{backgroundColor: iconsBackground[pokemonDetail.types?.[0].type.name]}}>Height: {pokemonDetail.height} m</p>
                            <p style={{backgroundColor: iconsBackground[pokemonDetail.types?.[0].type.name]}}>Weight: {pokemonDetail.weight} kg</p>
                        </div>
                        
                    </div>

                    <div style={{backgroundColor: colorsBackground[pokemonDetail.types?.[0].type.name]}}>
                        <h2>Abilities</h2>
                        {
                            pokemonDetail.abilities?.map(pokemon=><div key={pokemon.ability.name}>
                                                                        <p style={{backgroundColor: iconsBackground[pokemonDetail.types?.[0].type.name]}}>
                                                                            {pokemon.ability.name}
                                                                        </p>
                                                                  </div>)
                        }
                    </div>
               </div>
            </div>
            <div className='stats'>
                        {
                            pokemonDetail.stats?.map(pokemon=>(<div key={pokemon.stat.name}>
                                                                        <p>{pokemon.stat.name}</p>
                                                                        <div  style={{ width: 150, height: 150 }}>
                                                                            <ProgressBar maxValue={pokemon.base_stat} 
                                                                                         color={iconsBackground[pokemonDetail.types?.[0].type.name]}
                                                                                        
                                                                            />
                                                                        </div>
                                                                        
                                                                     
                                                                </div>))
                        }


            </div>

            <Link to='/settings'>
                <button className='settings'><i className="fas fa-cog fa-2x"></i></button>
            </Link>
        </div>
    ); 
};

export default PokemonInfo;