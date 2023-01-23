import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { register,registerPharm } from '../actions/userActions';
import { listVille } from '../actions/villeActions';

function RegisterScreenPharm(props){

    const villeList = useSelector(state => state.villeList);
    const { ville, loadingVille, errorVille} = villeList;
    const dispatch = useDispatch();

    const [nomPharmacie, setNomPharmacie] = useState('');
    const [nomPharm, setNomPharm] = useState('');
    const [emailPharmacie, setEmailPharmacie] = useState('');
    const [passwordPharmacie, setPasswordPharmacie] = useState('');
    const [rePasswordPharmacie, setRePasswordPharmacie] = useState('');
    const [villeIn, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const pharmRegister = useSelector(state=>state.pharmRegister);
    
    const { loading, userInfoPharm, error } = pharmRegister; 
        
        const getLongitude = ()=>{
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
        }
        
    useEffect(() => {
        dispatch(listVille());
        return () => {
            //
        };
    },[])

    useEffect(() =>{
        if(userInfoPharm){
            props.history.push("/");
        }
        return () => {
            //
        };
    }, [userInfoPharm]);
    
    
   const submitHandlerPharm = (e) =>{
        e.preventDefault();
        dispatch(registerPharm(nomPharmacie, nomPharm, adresse, emailPharmacie, passwordPharmacie, rePasswordPharmacie, villeIn, longitude, latitude));
    }

    return <div className="form">
        {
            loadingVille ? <div>En cours de  chargement...</div>
                :
                errorVille ? <div>{errorVille}</div> 
                : 
            (<div>

            <button className="button primary" onClick={getLongitude}>Obtenir localisation</button>
            <form onSubmit={submitHandlerPharm}>
                <ul className="form-container ">
                    <li className="text-center">
                        <h2>Pharmacie</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        <div id="status"></div>
                    </li>
                    <li>
                        <label htmlFor="nomPharmacie">Nom de la pharmacie</label>
                        <input type="text" name="nomPharmacie" id="nomPharmacie" onChange={(e) => setNomPharmacie(e.target.value)}  required/>
                    </li>
                    <li>
                        <label htmlFor="nomPharm">Nom et prénom du pharmacien</label>
                        <input type="text" name="nomPharm" id="nomPharm" onChange={(e) => setNomPharm(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="adresse">Adresse de la pharmacie</label>
                        <textarea rows="3" cols="10" name="adresse" id="adresse" onChange={(e) => setAdresse(e.target.value)}></textarea>
                    </li>
                    <li>
                        <label htmlFor="emailPharmacie">Email</label>
                        <input type="email" name="emailPharmacie" id="emailPharmacie" onChange={(e) => setEmailPharmacie(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="passwordPharmacie">Mot de passe</label>
                        <input type="password" name="passwordPharmacie" id="passwordPharmacie" onChange={(e) => setPasswordPharmacie(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="rePasswordPharmacie">Confirmer mot de passe</label>
                        <input type="password" name="rePasswordPharmacie" id="rePasswordPharmacie" onChange={(e) => setRePasswordPharmacie(e.target.value)} required/>
                    </li>
                    <li>
                        <label htmlFor="villeIn">Ville</label>
                        {
                             <select name="villeIn" id="villeIn" value={villeIn} onChange={(e) => {setVille(e.target.value)}} >
                                {
                                    
                                    ville.map(city => <option value={city.idVille}>{city.nomVille}</option>)
                                }
                             </select>
                        }
                       
                    </li>
                    <li>
                        <input type="text"  name="longitude" id="longitude"  onChange={(e) => setLongitude(e.target.value)} required/>
                        <input type="text" name="latitude" id="latitude" onChange={(e) => setLatitude(e.target.value)} required/>
                    </li>
                    <li>
                        <button type="submit"  className="button primary">S'inscrire</button>
                    </li>
                    <li className="text-center">
                        Vous avez déjà un compte? <Link to="/signin/2">Se connecter</Link>
                    </li>
                </ul>
                
            </form>
            </div>
            )
        }
        
    </div>
    
}
export default RegisterScreenPharm;