import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {colorsBackground, iconsBackground, iconsTypes} from '../../../colors'
import './PokemonInfo.styles.css'

const Pokemon = ({url,name}) => { 

    const [pokemon, setPokemon]=useState({})
    useEffect(()=>{
        axios.get(url).then(res=>setPokemon(res.data))
    },[url])

    return (
        
        <Link to={`/pokedex/${name}`} className='link'>
            <div className='card-pokemon' style={{backgroundColor: colorsBackground[pokemon.types?.[0].type.name]}}>
                <div>
                    <p># 0{pokemon.id}</p>
                    <h2>{name}</h2>
                    <div className='types-info'>
                        {
                            pokemon.types?.map(pokemon=>(<div style={{backgroundColor: iconsBackground[pokemon.type.name]}} 
                                                             key={pokemon.type.name}>
                                                                    {iconsTypes[pokemon.type.name]}
                                                                    <p>{pokemon.type.name} </p>
                                                         </div>))
                        }
                    </div>

                    
                </div>
                
                <img src={pokemon.sprites?.other['official-artwork'].front_default} alt="Pokemon" />

               
            </div>
        </Link>
      
    );
};

export default Pokemon;