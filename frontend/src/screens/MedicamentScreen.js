import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { detailsMedicament } from '../actions/medicamentActions';

function MedicamentScreen(props){
    const [qte, setQte] = useState(1);
    const medicamentDetails = useSelector(state => state.medicamentDetails);
    const { medicament, loading, error} = medicamentDetails;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(detailsMedicament(props.match.params.id));
        return () => {
            //
        };
    }, []);

    const ajouterAuPanier = () =>{
        props.history.push("/panier/" + props.match.params.id + "?qte=" + qte)
    }
    return <div>
    
        <div className="back-to-result">
            <Link to="/recherche/resultat">Revenir en arrière</Link>
        </div>
        {loading ? <div>Chargement en cours...</div>:
        error ? <div>{error}</div> :
        medicament.map(detailMed=>
        <div className="details">
            <div className="details-image">
                <img src={detailMed.image} alt="medicament"/>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <b>{detailMed.nomMedicament}</b>
                    </li>
                    <li>
                        Prix: <b>{detailMed.prix} F CFA</b>
                    </li>
                    <li>
                        Description:
                        <div>
                            {detailMed.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Prix: {detailMed.prix} F CFA
                    </li>
                    <li>
                        Etat: {detailMed.nombreDisponible > 0 ? "Disponible": "Indisponible"}
                    </li>
                    <li>
                        Qté: {detailMed.nombreDisponible <= 5 ? 
                            <select value={qte} onChange={(e) => {setQte(e.target.value)}}>
                                {[...Array(detailMed.nombreDisponible).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                )} 
                            </select>
                            :
                            <select value={qte} onChange={(e) => {setQte(e.target.value)}}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            }
                    </li>
                    <li>
                        {detailMed.nombreDisponible > 0 && <button onClick={ajouterAuPanier} className="button primary">Ajouter au Panier</button>}                      
                    </li>
                </ul>
            </div>
        </div>
        )}        

    </div>
}
export default MedicamentScreen;