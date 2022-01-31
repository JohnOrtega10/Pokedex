import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import './Home.styles.css'
import { characters } from '../../characters';


const Home = () => {
    
    const [name, setName]=useState("")
    const navigate = useNavigate();
    const dispath = useDispatch()

    const [sceneValue, setSceneValue] = useState(1)
    const [scene, setScene] = useState("")

    const submit = (e)=>{
        e.preventDefault();
    }

    useEffect(()=>{

        switch (sceneValue) {
            case 1:   
               return setScene("I am that which humans call pokedex.") 
            case 2:
                return setScene("In me you will find all the information related to pokemons.")
            case 3:
                return setScene("Now, I wish to know thine apperance.")  
            case 4:  
                return setScene("What is thy name?")   
            case 5:
                dispath({type: "SET_NAME", payload: name})
                return  setScene(`${name} ...`)
            case 6:
                return setScene('A new pokemon master.');
            case 7:
                return navigate('/pokedex');
            default:
                break;
        }

    },[sceneValue, dispath, navigate, name])


    const [scene2, setScene2]= useState("")
    const [i, setI] = useState(0)
    
    useEffect(()=>{
        if(i<scene.length){
            setTimeout(() => {
                setScene2(scene.substring(0,i+1))
                setI(i+1)
            }, 30);
           
        }
       
    }, [i, scene])


    const changeScene = ()=>{
        setSceneValue(sceneValue+1)
        setI(0)
    }

    return (
        <div className='home-container'>
           
            {
                sceneValue === 3 &&( <div className='characters'> {
                                                                    characters.map(character=>(<div key={character.id}>
                                                                                                    <img src={character.image} 
                                                                                                            alt="character" onClick={()=>{changeScene()
                                                                                                                                    dispath({type: "SET_APPERANCE", payload:character.image})}}/>
                                                                                                </div>))

                                                                    } 
                                        </div>)
            }


            {
             
                sceneValue === 4 &&  <form onSubmit={submit}>
                                            <label>
                                                <input type="text" 
                                                    onChange={e=>setName(e.target.value)}
                                                    value={name}
                                                    placeholder='Enter your name'
                                                    className='input'
                                                    />
                                            </label>
                                      </form>
            }
           
            <div className='scene'>
                <p>{scene2}</p> 
                {   
                     (sceneValue !== 3 &&  sceneValue !== 4 && scene.length===scene2.length) && (<button onClick={changeScene}>
                                                                                                    <i class="fas fa-caret-down fa-2x"></i>
                                                                                               </button>)
                }

                {   
                     (sceneValue === 4 &&  name && scene.length===scene2.length) && (<button onClick={changeScene}>
                                                                                                    {/* <i className="fas fa-caret-right fa-2x "></i> */}
                                                                                                    <i class="fas fa-caret-down fa-2x"></i>
                                                                                   </button>)
                }
                
            </div>
        </div>
    );
};

export default Home;