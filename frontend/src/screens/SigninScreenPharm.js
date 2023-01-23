import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signinPharm } from '../actions/userActions';


function SigninScreenPharm(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const pharmSignin = useSelector(state=>state.pharmSignin);
    const { loading, userInfoSigninPharm, error } = pharmSignin;
    const dispatch = useDispatch();

    useEffect(() =>{
        if(userInfoSigninPharm){
            props.history.push("/");
        }
        return () => {
            //
        };
    }, [userInfoSigninPharm]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signinPharm(email, password));
    }

    return <div className="form">

        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li className="text-center">
                    <h2>Pharmacie</h2>
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
                    <Link to="/register/2" className="button full-width text-center secondary">Créer un compte</Link>
                </li>
            </ul>
        </form>

    </div>
}
export default SigninScreenPharm;