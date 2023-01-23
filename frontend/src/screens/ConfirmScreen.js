import React, { useEffect,useState } from 'react';
import { pourConfirmer, retirerMedicament } from '../actions/panierActions';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom';


function ConfirmScreen(props) {
    /* const [cookies,setCookies] = useCookies('userSigninInfo');
    const user = cookies.userSigninInfo.email; */

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfoSignin} = userSignin;
  
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo} = userRegister;
  
    const user = userInfoSignin ? userInfoSignin.email : userInfo.email;
  
    const panier = useSelector(state => state.panier);
    const { panierItems } = panier;
    
    const confirmat = useSelector(state => state.confirmat);
    const {success} = confirmat;
    console.log(success);
    const dispatch = useDispatch();
    const prixTotal = panierItems.reduce((a, c) => a + c.prix * c.qte, 0);
  
  useEffect(() => {
     /*  if(success){
        props.history.push('/');
      } */
  }, []);

  /* const retirerMedicamentPanier = (medicamentId) => {
    dispatch(retirerMedicament(medicamentId));
  } */
  
  /* const confirmerAchat= (item)=>{
    dispatch(confirmerPanier(item.idMedicament,item.nomMedicament,item.prix));
    /* setId(item.idMedicament);
    setNom(item.nomMedicament);
    setPrix(item.prix);
    setDescription(item.description);
    setImage(item.image);
    setNombreDisponible(item.nombreDisponible); 
    setQte(item.qte);
      prompt('Achat effectué avec succes')
  } */

  const confirmerAchat = ()=>{
    panierItems.map(item=>{
        const qte = item.qte;
        const prix = item.prix;
        const id = item.idMedicament;
        const nombreDisponible = item.nombreDisponible;
        dispatch(pourConfirmer(qte,prix,id,user,nombreDisponible));
        alert('Achat effectué avec succes');
        console.log(qte);
    })
      
  }
    return <div className="panier">
        <div className="panier-list">
            <ul className="panier-list-container">
                <li>
                    <h3>
                        <b>Veuillez confirmer l'achat de: </b>
                    </h3>
                    <div>
                        Prix
                    </div>
                </li>
                
                {
                    panierItems.map( item =>
                        <li>
                            <div className="panier-image">
                                <img src={item.image} alt="medicament" />
                            </div>
                            <div className="panier-nom">
                                <div>
                                    {item.nomMedicament}
                                </div>
                                <div>
                                    Qté:{item.qte}
                                    {/* 
                                    <button type="button" className="button primary" onClick={() =>retirerMedicamentPanier(item.idMedicament)}>
                                        Retirer
                                    </button> */}
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
            <button onClick={confirmerAchat} className="button primary full-width" disabled={panierItems.length === 0}>
                Confirmer achat
            </button>
            
        </div>
        
    </div>
}

export default ConfirmScreen;