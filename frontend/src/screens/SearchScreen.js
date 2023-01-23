import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { listVille } from '../actions/villeActions';
import { useSelector, useDispatch } from 'react-redux';
import { SearchMedicaments } from '../actions/medicamentActions';

function SearchScreen(props){
    const villeList = useSelector(state => state.villeList);
    const { ville, loadingVille, errorVille} = villeList;

    const searchMedicament = useSelector(state => state.searchMedicament);
    const { success, loading, error} = searchMedicament;
    const dispatch = useDispatch();
    const [villeIn, setVille] = useState('');
    const [medicament, setMedicament] = useState('');

    console.log(typeof(villeIn));

    useEffect(() => {
        dispatch(listVille());
        return () => {
            //
        };
    },[]);

    useEffect(() =>{
        if(success){
            props.history.push("/recherche/resultat/"+ villeIn +"?medicament="+ medicament);
        }
        return () => {
            //
        };
    }, [success]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(SearchMedicaments(medicament, villeIn));
    }

    const goLocalisation = () =>{
        props.history.push("/rechercheLocal?local=oui") 
    }
    return <div>
{
            loadingVille ? <div>En cours de  chargement...</div>
                :
                errorVille ? <div>{errorVille}</div> 
                : 
            (
        <div className="sectionR-1">
            <div className="sous-sectionR-1">
                <div className="title">Géolocalisation</div>
                <div className="toggle-button" onClick={goLocalisation}>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div> 
            </div>
            <div className="sous-sectionR-2">
                <img src="img/rechercher.png" className="rounded float-left" alt="..."/>
                <div className="recherche">
                    <h2>Lancer une recherche</h2>
                    <form className="d-flex flex-column formulaire" onSubmit={submitHandler}>
                        <div className="d-flex flex-column">
                            <label htmlFor="medicament">Nom du médicament</label>
                            <input type="text" name="medicament" id="medicament" onChange={(e) => setMedicament(e.target.value)}  required/>
                        </div>
                        <div className="d-flex flex-column">
                            <label for="InputLoc">Ville de recherche</label>
                            {
                             <select htmlFor="villeIn" id="villeIn" value={villeIn} onChange={(e) => {setVille(e.target.value)}} >
                                {
                                    
                                    ville.map(city => <option value={city.idVille}>{city.nomVille}</option>)
                                }
                             </select>
                        }
                        </div>
                        <div>
                            <button name="validateSearch" className="btn btn-primary">Rechercher</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>)
}
    </div>
        
}
export default SearchScreen;