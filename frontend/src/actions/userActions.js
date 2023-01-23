import Axios from "axios";
import Cookie from "js-cookie";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, PHARM_REGISTER_REQUEST, PHARM_REGISTER_SUCCESS, PHARM_REGISTER_FAIL, PROFIL_SHOW_ACHAT, PROFIL_SHOW_RESERV, MEDICAMENT_CANCEL_REQUEST, MEDICAMENT_CANCEL_SUCCESS, MEDICAMENT_CANCEL_FAIL, MEDICAMENT_CONFIRM_REQUEST, MEDICAMENT_CONFIRM_SUCCESS, MEDICAMENT_CONFIRM_FAIL, PHARM_SHOW_ACHATFINAL, PHARM_SHOW_ACHAT, PHARM_SHOW_RESERV, USER_SIGNOUT } from "../constants/userConstants";


const signin = (email, password) => async (dispatch,getState) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email,password}});
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        const {userSignin:{ userInfoSignin }}= getState();
        Cookie.set('userInfoSignin', JSON.stringify(userInfoSignin));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const signinPharm = (email, password) => async (dispatch,getState) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email,password}});
    try {
        const {data} = await Axios.post("/api/users/signinPharm", {email, password});
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        const {pharmSignin:{ userInfoSigninPharm }}= getState();
        Cookie.set('userInfoSigninPharm', JSON.stringify(userInfoSigninPharm),{secure:true, expires:2 });
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const register = (nom, prenom, email, password, rePassword) => async(dispatch,getState) =>{
    dispatch({type: USER_REGISTER_REQUEST, payload: {nom,prenom, email, password, rePassword}});
    try {
        const {data} = await Axios.post("/api/users/register", {nom,prenom, email, password, rePassword});
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        const { userRegister:{ userInfo } }=getState();
        Cookie.set('userInfo', JSON.stringify(userInfo),{ secure: true, expires:2});
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

 const registerPharm = (nomPharmacie, nomPharm, adresse, emailPharmacie, passwordPharmacie, rePasswordPharmacie, villeIn, longitude, latitude) => async (dispatch,getState) =>{
    dispatch({type: PHARM_REGISTER_REQUEST, payload: {nomPharmacie, nomPharm, adresse, emailPharmacie, passwordPharmacie, rePasswordPharmacie, villeIn, longitude, latitude}});
    try {
        const {data} = await Axios.post("/api/users/registerPharm", {nomPharmacie, nomPharm, adresse, emailPharmacie, passwordPharmacie, rePasswordPharmacie, villeIn, longitude, latitude});
        dispatch({ type: PHARM_REGISTER_SUCCESS, payload: data });
        const { pharmRegister:{ userInfoPharm } }=getState();
        Cookie.set('userInfoPharm', JSON.stringify(userInfoPharm),{ secure: true, expires:2});
    } catch (error) {
        dispatch({ type: PHARM_REGISTER_FAIL, payload: error.message });
    }
} 

const profil = (user)=>async (dispatch,getState)=>{
    try {
      const { data } = await Axios.post("/api/profil", {user});
      dispatch({type: PROFIL_SHOW_ACHAT, payload:data});/* 
      const {panier:{panierItems}} = getState();
      Cookie.set("panierItems",JSON.stringify(panierItems)); */
  
    } catch (error) {
  
    }
  }

  const profilReserv = (user)=>async (dispatch,getState)=>{
    try {
      const { data } = await Axios.post("/api/profilReserv", {user});
      dispatch({type: PROFIL_SHOW_RESERV, payload:data});/* 
      const {panier:{panierItems}} = getState();
      Cookie.set("panierItems",JSON.stringify(panierItems)); */
  
    } catch (error) {
  
    }
  }

  const deleteReserv = (id,qte,idMed,nombre) => async (dispatch) => {
    try {
        dispatch({type: MEDICAMENT_CANCEL_REQUEST, payload: {id,qte,idMed,nombre}});
        const {data} = await Axios.post("/api/reservation/",{id,qte,idMed,nombre} );
        dispatch({type: MEDICAMENT_CANCEL_SUCCESS, payload: data, success:true});
    } catch (error) {
        dispatch({type: MEDICAMENT_CANCEL_FAIL, payload: error.message});
    }
}

const confirmReserv = (id,qte,idMed,nombre,prix,client) => async (dispatch) => {
    try {
        dispatch({type: MEDICAMENT_CONFIRM_REQUEST, payload: {id,qte,idMed,nombre,prix,client}});
        const {data} = await Axios.post("/api/reservationConfirm/",{id,qte,idMed,nombre,prix,client} );
        dispatch({type: MEDICAMENT_CONFIRM_SUCCESS, payload: data, success:true});
    } catch (error) {
        dispatch({type: MEDICAMENT_CONFIRM_FAIL, payload: error.message});
    }
}

const consultAchatFinal = (pharmacie)=>async (dispatch,getState)=>{
    try {
      const { data } = await Axios.post("/api/achatFinal", {pharmacie});
      dispatch({type: PHARM_SHOW_ACHATFINAL, payload:data});/* 
      const {panier:{panierItems}} = getState();
      Cookie.set("panierItems",JSON.stringify(panierItems)); */
  
    } catch (error) {
  
    }
  }

  const consultAchat = (pharmacie)=>async (dispatch,getState)=>{
    try {
      const { data } = await Axios.post("/api/achatConsult", {pharmacie});
      dispatch({type: PHARM_SHOW_ACHAT, payload:data});/* 
      const {panier:{panierItems}} = getState();
      Cookie.set("panierItems",JSON.stringify(panierItems)); */
  
    } catch (error) {
  
    }
  }

  const consultReserv = (pharmacie)=>async (dispatch,getState)=>{
    try {
      const { data } = await Axios.post("/api/reservConsult", {pharmacie});
      dispatch({type: PHARM_SHOW_RESERV, payload:data});/* 
      const {panier:{panierItems}} = getState();
      Cookie.set("panierItems",JSON.stringify(panierItems)); */
  
    } catch (error) {
  
    }
  }

  const deleteAchat = (id,qte,idMed,nombre) => async (dispatch) => {
    try {
        dispatch({type: MEDICAMENT_CANCEL_REQUEST, payload: {id,qte,idMed,nombre}});
        const {data} = await Axios.post("/api/deleteAchatPharm",{id,qte,idMed,nombre} );
        dispatch({type: MEDICAMENT_CANCEL_SUCCESS, payload: data, success:true});
    } catch (error) {
        dispatch({type: MEDICAMENT_CANCEL_FAIL, payload: error.message});
    }
}

const confirmAchet = (id,qte,idMed,prix,client) => async (dispatch) => {
    try {
        dispatch({type: MEDICAMENT_CONFIRM_REQUEST, payload: {id,qte,idMed,prix,client}});
        const {data} = await Axios.post("/api/achatConfirmPharm",{id,qte,idMed,prix,client} );
        dispatch({type: MEDICAMENT_CONFIRM_SUCCESS, payload: data, success:true});
    } catch (error) {
        dispatch({type: MEDICAMENT_CONFIRM_FAIL, payload: error.message});
    }
}

export const signout = () => (dispatch) => {
    Cookie.remove('userInfo');
    Cookie.remove('userInfoPharm');
    Cookie.remove('userInfoSigninPharm');
    Cookie.remove('userInfoSignin');
    Cookie.remove('panierItems');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/signin/1';
  };
export { signin,signinPharm,register,registerPharm,profil,profilReserv,deleteReserv,confirmReserv,consultAchatFinal,consultAchat,consultReserv,deleteAchat,confirmAchet }