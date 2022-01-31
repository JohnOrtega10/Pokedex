import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Settings.styles.css'
const Settings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const itemsPage = useSelector(state=>state.itemsPage)
    const itemsNumber = [4,8,12,16,20]  
    const isDark = useSelector(state=>state.isDark) 
  
  
    return (
        <div className='settings-container'>
            <button onClick={()=>navigate(-1)}> <i className="fas fa-arrow-circle-left fa-4x"></i></button>
            <h1>Settings</h1>

            <div className='button-switch'>
                    <h2>Theme</h2>
                    <div>
                        <p>Light</p>
                        <input type="checkbox" id='btn-switch'onChange={e=>dispatch({type:'CHANGE_THEME', payload: e.target.checked})}checked={isDark}/>
                        <label htmlFor="btn-switch" className='lbl-switch' ></label> 
                        <p>Dark</p>
                    </div>
                    
            </div>

            <div className='items'>

                <h2>Items for page</h2>
                
                <select onChange={e=>dispatch({type: 'CHANGE_ITEMS', payload: +e.target.value}) } defaultValue={itemsPage} >
                    {
                        itemsNumber.map(item => <option value={item}  key={item}>{item} items</option>)
                        
                    }
                </select>

            </div>
            
        </div>
    );
};

export default Settings;