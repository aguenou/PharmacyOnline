import { MEDICAMENT_LIST_REQUEST, MEDICAMENT_LIST_SUCCESS, MEDICAMENT_LIST_FAIL, MEDICAMENT_DETAILS_REQUEST, MEDICAMENT_DETAILS_SUCCESS, MEDICAMENT_DETAILS_FAIL, MEDICAMENT_SAVE_REQUEST, MEDICAMENT_SAVE_SUCCESS, MEDICAMENT_SAVE_FAIL, MEDICAMENT_SEARCH_REQUEST, MEDICAMENT_SEARCH_SUCCESS, MEDICAMENT_SEARCH_FAIL, LIST_MEDICAMENT_REQUEST, LIST_MEDICAMENT_SUCCESS, LIST_MEDICAMENT_FAIL, MEDICAMENT_DELETE_SUCCESS, MEDICAMENT_DELETE_REQUEST, MEDICAMENT_DELETE_FAIL } from "../constants/medicamentConstants";
import axios from "axios";
import Axios from "axios";

const listMedicaments = (id,medicament) => async (dispatch) => {
    try {
        dispatch({ type: MEDICAMENT_LIST_REQUEST, payload: {id,medicament}});
        const {data} = await axios.post("/api/recherche/resultat/",{id,medicament});
        dispatch({type: MEDICAMENT_LIST_SUCCESS, payload: data});
    } catch (error) {
        
        dispatch({type: MEDICAMENT_LIST_FAIL, payload: error.message});
    }   
}

const medicamentList =(emal) =>async (dispatch) => {
    try {
        dispatch({ type: LIST_MEDICAMENT_REQUEST, payload: {emal}});
        const {data} = await axios.post("/api/listMedicamentPharm",{emal});
        dispatch({type: LIST_MEDICAMENT_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: LIST_MEDICAMENT_FAIL, payload: error.message});
    }
}
const SearchMedicaments = (medicament,villeIn) => async (dispatch) => {
    try {
        dispatch({ type: MEDICAMENT_SEARCH_REQUEST, payload: {medicament,villeIn} });
        const {data} = await axios.post("/api/recherche",{medicament,villeIn});
        dispatch({type: MEDICAMENT_SEARCH_SUCCESS, payload: data});
    } catch (error) {
        
        dispatch({type: MEDICAMENT_SEARCH_FAIL, payload: error.message});
    }   
}

const saveMedicament = (id, nom, prix, nombreDisponible, description,image,email) => async(dispatch) =>{
    try {
        dispatch({type: MEDICAMENT_SAVE_REQUEST, payload: {nom, prix, nombreDisponible, description,image,email}});
        if(!id){
            const { data } = await Axios.post("/api/medicaments",{nom, prix, nombreDisponible, description,image,email});
            dispatch({ type: MEDICAMENT_SAVE_SUCCESS, payload: data });
        } else{
            const { data } = await Axios.put("/api/medicaments/"+ id,{nom, prix, nombreDisponible, description,image,email});
            dispatch({ type: MEDICAMENT_SAVE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({ type: MEDICAMENT_SAVE_FAIL, payload: error.message });
    }
}
const detailsMedicament = (medicamentId) => async (dispatch) => {
    try {
        dispatch({type: MEDICAMENT_DETAILS_REQUEST, payload: medicamentId});
        const {data} = await axios.get("/api/detailmedicament/"+ medicamentId);
        dispatch({type: MEDICAMENT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: MEDICAMENT_DETAILS_FAIL, payload: error.message});
    }
}
const deleteMedicament = (id) => async (dispatch) => {
    try {
        dispatch({type: MEDICAMENT_DELETE_REQUEST, payload: id});
        const {data} = await axios.delete("/api/medicaments/"+ id);
        dispatch({type: MEDICAMENT_DELETE_SUCCESS, payload: data, success:true});
    } catch (error) {
        dispatch({type: MEDICAMENT_DELETE_FAIL, payload: error.message});
    }
}

const SearchMedicamentLocal = (medicament,lat,lon,positionIn) => async (dispatch) => {
    try {
        dispatch({ type: MEDICAMENT_SEARCH_REQUEST, payload: {medicament,lat,lon,positionIn} });
        const {data} = await axios.post("/api/rechercheLocal",{medicament,lat,lon,positionIn});
        dispatch({type: MEDICAMENT_SEARCH_SUCCESS, payload: data});
    } catch (error) {
        
        dispatch({type: MEDICAMENT_SEARCH_FAIL, payload: error.message});
    }   
}

export { listMedicaments, detailsMedicament, saveMedicament, SearchMedicaments,medicamentList,deleteMedicament,SearchMedicamentLocal}