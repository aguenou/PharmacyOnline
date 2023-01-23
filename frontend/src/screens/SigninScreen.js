import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../actions/userActions';


function SigninScreen(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const { loading, userInfoSignin, error } = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    
    console.log(userInfoSignin);
    useEffect(() =>{
        if(userInfoSignin){
            props.history.push(redirect === '/'? '/':'/'+redirect);
        }
        return () => {
            //
        };
    }, [userInfoSignin]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">

        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li className="text-center">
                    <h2>Client</h2>
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
                    <Link to={redirect === "/" ? "/register/1" : "/register/1?redirect="+redirect} className="button full-width text-center secondary">Créer un compte</Link>
                </li>
            </ul>
        </form>

    </div>
}
export default SigninScreen;