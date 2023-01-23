import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ajouterPanier, retirerMedicament } from '../actions/panierActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';


function PanierScreen(props) {
  const panier = useSelector(state => state.panier);
  const { panierItems } = panier;

  const medicamentId = props.match.params.id;
  const qte = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (medicamentId) {
      dispatch(ajouterPanier(medicamentId, qte));
    }
  }, []);
  const retirerMedicamentPanier = (medicamentId) => {
    dispatch(retirerMedicament(medicamentId));
  }
  
  const achatPanier= ()=>{
      props.history.push("/signin/1?redirect=shipping");
  }
  const reservPanier= ()=>{
      props.history.push("/signin/1?redirect=reservation");
  }
    return <div className="panier">
        <div className="panier-list">
            <ul className="panier-list-container">
                <li>
                    <h3>
                        <b>Panier d'achat</b>
                    </h3>
                    <div>
                        Prix
                    </div>
                </li>
                
                {
                    panierItems.length === 0 ?
                    <div>
                        Votre panier est vide
                    </div>
                    :
                    
                    panierItems.map( item =>
                        <li>
                            <div className="panier-image">
                                <img src={item.image} alt="medicament" />
                            </div>
                            <div className="panier-nom">
                                <div>
                                    <Link to={"/medicament/"+ item.idMedicament}>
                                        {item.nomMedicament}
                                    </Link>
                                </div>
                                <div>
                                    Qté:{item.nombreDisponible <= 5 ? 
                                        <select value={item.qte} onChange={(e) => dispatch(ajouterPanier(item.idMedicament, e.target.value))}>
                                            {[...Array(item.nombreDisponible).keys()].map(x =>
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            )}
                                        </select>
                                        :
                                        <select value={item.qte} onChange={(e) => dispatch(ajouterPanier(item.idMedicament, e.target.value))}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                    }
                                    
                                    <button type="button" className="button primary" onClick={() =>retirerMedicamentPanier(item.idMedicament)}>
                                        Retirer
                                    </button>
                                </div>
                                <div>
                                    {item.nomPharmacie}
                                </div>
                            </div>
                            <div className="panier-prix">
                                {item.prix} F CFA
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className="panier-action">
            <h3>
                <b>
                Total ( {panierItems.reduce((a, c)=> a + c.qte, 0)} choix )
                :
                {panierItems.reduce((a, c) => a + c.prix * c.qte, 0)} F CFA
                </b>
            </h3>
            <button onClick={achatPanier} className="button primary full-width" disabled={panierItems.length === 0}>
                Effectuer achat
            </button>
            <button onClick={reservPanier} className="button primary full-width" disabled={panierItems.length === 0}>
                Effectuer réservation
            </button>
        </div>
        
    </div>
}

export default PanierScreen;