import RegisterScreen from './RegisterScreen';
import RegisterScreenPharm from './RegisterScreenPharm';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../actions/userActions';


function ScreenRegister(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const { loading, userInfoSignin, error } = userSignin;
    const dispatch = useDispatch();

    useEffect(() =>{
        if(userInfoSignin){
            props.history.push("/");
        }
        return () => {
            //
        };
    }, [userInfoSignin]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    }

    const changeScreen = ()=>{
        const checkbox = document.getElementById('checkbox');
        const pharm = document.getElementsByClassName('pharm');
        const client = document.getElementsByClassName('client');
        if(checkbox.checked == true){
            pharm.style.display='block';
            client.style.display='none';
        }else{
            pharm.style.display='none';
            client.style.display='block';
        }
        
    }
    
    return <div className="componentSign">

    <h2>Inscription</h2>
    <BrowserRouter>
        {/* <div className="selectCheck">
            <div>Client</div>
            <div className="figure">
                <input type="checkbox" className="checkbox"  onClick={changeScreen} id="checkbox"/>
                <label for="checkbox" className="label">
                    <div className="ball" ></div>
                </label>
            </div>
            <div>Pharmacie</div>
        </div> */}
        <div className="client">
            <Route path="/register" component={RegisterScreen} />
        </div>
        <div className="pharm"/*  style={{display:'none'}} */>
            <Route path="/register" component={RegisterScreenPharm} />
        </div>
        
    </BrowserRouter>
{/*         <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li className="text-center">
                        <h2>Connexion</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Se connecter</button>
                    </li>
                    <li className="text-center">
                        Vous n'avez pas de compte?
                    </li>
                    <li>
                        <Link to="/register" className="button full-width text-center secondary">Créer un compte</Link>
                    </li>
                </ul>
            </form>
        </div> */}

    </div>
}
export default ScreenRegister;