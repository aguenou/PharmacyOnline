import Axios from "axios";
import Cookie from "js-cookie";
import { PANIER_ADD_ITEM, PANIER_CONFIRM_ITEM, PANIER_REMOVE_ITEM, PANIER_RESERV_ITEM } from "../constants/panierConstants";

const ajouterPanier = (medicamentId, qte) => async (dispatch,getState) => {
  try {
    const { data } = await Axios.get("/api/panier/"+ medicamentId);
    dispatch({type: PANIER_ADD_ITEM, payload:{
      qte,
      idMedicament:data.idMedicament,
      nomMedicament:data.nomMedicament,
      image:data.image,
      prix:data.prix,
      nomPharmacie:data.nomPharmacie,
      adresse:data.adresse,
      nombreDisponible:data.nombreDisponible
    }});
    const {panier:{panierItems}} = getState();
    Cookie.set("panierItems",JSON.stringify(panierItems));

  } catch (error) {

  }
}
const retirerMedicament = (medicamentId) => (dispatch, getState) =>{
    dispatch({type: PANIER_REMOVE_ITEM, payload: medicamentId});

    const {panier:{panierItems}} = getState();
    Cookie.set("panierItems",JSON.stringify(panierItems));
}

const pourConfirmer = (qte,prix,id,user,nombreDisponible)=>async (dispatch,getState)=>{
  try {
    const { data } = await Axios.post("/api/panierConfirm", {qte,prix,id,user,nombreDisponible});
    dispatch({type: PANIER_CONFIRM_ITEM, payload:{data}});/* 
    const {panier:{panierItems}} = getState();
    Cookie.set("panierItems",JSON.stringify(panierItems)); */

  } catch (error) {

  }
}

const pourReserver = (qte,prix,id,user,nombreDisponible)=>async (dispatch,getState)=>{
  try {
    const { data } = await Axios.post("/api/panierReserv", {qte,prix,id,user,nombreDisponible});
    dispatch({type: PANIER_RESERV_ITEM, payload:{data}});/* 
    const {panier:{panierItems}} = getState();
    Cookie.set("panierItems",JSON.stringify(panierItems)); */

  } catch (error) {

  }
}
export { ajouterPanier, retirerMedicament,pourConfirmer,pourReserver }