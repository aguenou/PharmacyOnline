import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { register,registerPharm } from '../actions/userActions';
import { listVille } from '../actions/villeActions';

function RegisterScreen(props){

    /* const villeList = useSelector(state => state.villeList);
    const { ville, loadingVille, errorVille} = villeList; */
    

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    /* const [nomPharmacie, setNomPharmacie] = useState('');
    const [nomPharm, setNomPharm] = useState('');
    const [emailPharmacie, setEmailPharmacie] = useState('');
    const [passwordPharmacie, setPasswordPharmacie] = useState('');
    const [rePasswordPharmacie, setRePasswordPharmacie] = useState('');
    const [villeIn, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const pharmRegister = useSelector(state=>state.pharmRegister);
    
    const { loadingPharm, userInfoPharm, errorPharm } = pharmRegister;  */
    
    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect === '/'? '/':'/'+redirect);
        }
        return () => {
            //
        };
    }, [userInfo]);

     
       /*  const getLongitude = ()=>{
            const status = document.querySelector('#status');
            const long = document.querySelector('#longitude');
            const lat = document.querySelector('#latitude');
            
            lat.value = '';
            long.value = '';
            function success(position) {
                const longitude = position.coords.longitude;
                const latitude  = position.coords.latitude;
                status.textContent = '';
                lat.value = latitude;
                long.value = longitude;
                
                console.log(long.value);
                console.log(lat.value);

            }

            function error() {
                status.textContent = 'Echec de localisation. Vérifiez votre connexion';
            }

            if (!navigator.geolocation) {
                status.textContent = "La géolocation n'est pas supportée par votre navigateur";
            } else {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        } */
        
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(register(nom, prenom, email, password, rePassword));
    }
    /* useEffect(() => {
        dispatch(listVille());
        return () => {
            //
        };
    },[]) */


    return <div className="form">
        {
            <form onSubmit={submitHandler} /* className="formPharm" */>
                <ul className="form-container">
                    <li className="text-center">
                        <h2>Client</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="nom">Nom</label>
                        <input type="text" name="nom" id="nom"  onChange={(e) => setNom(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" name="prenom" id="prenom" onChange={(e) => setPrenom(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="rePassword">Confirmer mot de passe</label>
                        <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} required/>
                    </li>
                    <li>
                        <button type="submit" className="button primary">S'inscrire</button>
                    </li>
                    <li className="text-center">
                        Vous avez déjà un compte? <Link to={redirect === "/" ? "/signin/1" : "/signin/1?redirect="+redirect}>Se connecter</Link>
                    </li>
                </ul>
            </form>
            
        }
        
    </div>
    
}
export default RegisterScreen;