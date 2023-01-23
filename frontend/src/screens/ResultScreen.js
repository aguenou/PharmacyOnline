import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listMedicaments } from '../actions/medicamentActions';

function ResultScreen(props){

  const id = Number(props.match.params.id);
  const medicament = props.location.search.split("=")[1];
  const dispatch = useDispatch();
  console.log(id+ ' '+ medicament);

    const medicamentList = useSelector(state => state.medicamentList);
    const { medicaments, loading, error} = medicamentList;

    /* const medicamentSearch = useSelector(state => state.medicamentSearch);
    const { success, loading, error} = medicamentSearch; */

    useEffect(() => {
        dispatch(listMedicaments(id,medicament));
        return () => {
            //
        };
    },[])

    return loading ? <div>En cours de  chargement...</div> :
    error ? {error} :
        <div>

            <div className="sectionR-2">
                { (medicaments && medicaments.length == 0)  ?
                    <div>
                        Le médicament n'est pas disponible dans cette ville. Cliquez <a href="/recherche">ici</a> pour une autre recherche.
                    </div>
                    : 
                    medicaments.map(medicament =>
                        
                            <div key={medicament.idMedicament} className="media">
                                <img src={medicament.image} className="mr-3" alt="i-med" />
                                <div className="media-body">
                                <Link to={'/detailmedicament/'+medicament.idMedicament} className="link"><h5 className="mt-0">{medicament.nomMedicament}</h5></Link>
                                    <div className="d-flex media-pharm">
                                        <h6>{medicament.nomPharmacie}</h6>
                                        <h6>{medicament.adresse}</h6>
                                    </div>
                                    <div className="d-flex media-info">
                                        <h6>{medicament.prix} F CFA</h6>
                                    </div>            
                                </div>
                            </div>
                    )
                    
                }
            </div>
            
        </div>
}
export default ResultScreen;