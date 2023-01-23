import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { listPosition } from '../actions/villeActions';
import { useSelector, useDispatch } from 'react-redux';
import { SearchMedicamentLocal } from '../actions/medicamentActions';

function SearchLocalScreen(props){
    const positionList = useSelector(state => state.positionList);
    const { position, loadingPosition, errorPosition} = positionList;

    const medicamentSearch = useSelector(state => state.medicamentSearch);
    const { success, loading, error} = medicamentSearch;
    const dispatch = useDispatch();
    const [positionIn, setPosition] = useState('');
    const [medicament, setMedicament] = useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState('');
    const local = props.location.search.split("=")[1];

    console.log(typeof(positionIn));
    

    /* useEffect(() =>{
        dispatch(listPosition());
        return () => {
            //
        };
    }, []); */

    useEffect(() =>{
        
            props.history.push("/rechercheLocal/resultat/"+ positionIn +"?medicament="+ medicament);
        
        return () => {
            //
        };
    }, [success]);
    /* useEffect(() =>{
        
        return () => {
            //
        };
    }, [success]); */
    /* const validate = () =>{
        props.history.push("/rechercheLocal/resultat/"+ positionIn +"?medicament="+ medicament);
    } */
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(SearchMedicamentLocal(medicament,lat,lon, positionIn));
    }
    const getLongitude = ()=>{
        const statu = document.querySelector('#status');
        const long = document.querySelector('#noLon');
        const lat = document.querySelector('#noLat');
        
        lat.value = '';
        long.value = '';
        function success(position) {
            const longitude ='Longitude: '+ position.coords.longitude;
            const latitude  ='Latitude: '+ position.coords.latitude;
            statu.textContent = '';
            lat.textContent = latitude;
            long.textContent = longitude;
            
            console.log(long.value);
            console.log(lat.value);
        }

        function error() {
            statu.textContent = 'Echec de localisation. Vérifiez votre connexion';
        }

        if (!navigator.geolocation) {
            statu.textContent = "La géolocation n'est pas supportée par votre navigateur";
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    setTimeout( ()=>{
          getLongitude()
    },500) 

    const goLocalisation = () =>{
        props.history.push("/recherche") 
    }
    return <div>
        <div className="sectionR-1">
            <div className="sous-sectionR-1">
                <div className="title">Géolocalisation</div>
                <div className="toggle-button" onClick={goLocalisation}>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className=" slid round"></span>
                    </label>
                </div> 
            </div>
            <div className="sous-sectionR-2">
                <img src="img/rechercher.png" className="rounded float-left" alt="..."/>
                <div className="recherche">
                    <h2>Lancer une recherche</h2>
                    <div id="status"></div>
                    <form className="d-flex flex-column formulaire" onSubmit={submitHandler}>
                        <div className="d-flex flex-column">
                            <label htmlFor="medicament">Nom du médicament</label>
                            <input type="text" name="medicament" id="medicament" onChange={(e) => setMedicament(e.target.value)}  required/>
                        </div>
                        <div className="d-flex flex-column">
                            <label for="InputLoc">Rayon de recherche (en Km)</label>
                            <input type="number" name="positionIn" id="positionIn" onChange={(e) => setPosition(e.target.value)}  required/>
                            <div id="noLon"></div>
                            <div id="noLat"></div>
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="medicament">Longitude</label>
                            <input type="text" name="longitude" id="longitude"  onChange={(e) => setLon(e.target.value)} required/>
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="medicament">Latitude</label>
                            <input type="text" name="latitude" id="latitude"  onChange={(e) => setLat(e.target.value)} required/>
                        </div>
                        <div>
                            <button name="validateSearch" className="btn btn-primary">Rechercher</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    </div>
        
}
export default SearchLocalScreen;