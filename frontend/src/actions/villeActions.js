import axios from "axios"; 
import { VILLE_LIST_REQUEST, VILLE_LIST_SUCCESS, VILLE_LIST_FAIL, POSITION_LIST_REQUEST, POSITION_LIST_SUCCESS, POSITION_LIST_FAIL } from "../constants/villeConstants";
const listVille = () => async (dispatch) =>{
    try{
        dispatch({ type: VILLE_LIST_REQUEST });
        const {data} = await axios.get("/api/ville");
        dispatch({type: VILLE_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: VILLE_LIST_FAIL, payload: error.message});
    }
}

const listPosition = () => async (dispatch) =>{
    try{
        dispatch({ type: POSITION_LIST_REQUEST });
        const {data} = await axios.get("/api/position");
        dispatch({type: POSITION_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: POSITION_LIST_FAIL, payload: error.message});
    }
}

export { listVille,listPosition }