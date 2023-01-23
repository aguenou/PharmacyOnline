import { MEDICAMENT_LIST_REQUEST, MEDICAMENT_LIST_SUCCESS, MEDICAMENT_LIST_FAIL, MEDICAMENT_DETAILS_REQUEST, MEDICAMENT_DETAILS_SUCCESS, MEDICAMENT_DETAILS_FAIL, MEDICAMENT_SAVE_REQUEST, MEDICAMENT_SAVE_SUCCESS, MEDICAMENT_SAVE_FAIL, MEDICAMENT_SEARCH_REQUEST, MEDICAMENT_SEARCH_SUCCESS, MEDICAMENT_SEARCH_FAIL, LIST_MEDICAMENT_REQUEST, LIST_MEDICAMENT_SUCCESS, LIST_MEDICAMENT_FAIL, MEDICAMENT_DELETE_REQUEST, MEDICAMENT_DELETE_SUCCESS, MEDICAMENT_DELETE_FAIL } from "../constants/medicamentConstants";

function medicamentListReducer(state= {medicaments:[]}, action){

    switch (action.type){
        case MEDICAMENT_LIST_REQUEST:
            return {loading: true};
        case MEDICAMENT_LIST_SUCCESS:
            return {loading: false, medicaments: action.payload};
        case MEDICAMENT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function searchMedicamentReducer(state = {}, action){
    switch (action.type) {
        case MEDICAMENT_SEARCH_REQUEST:
            return { loading: true };
        case MEDICAMENT_SEARCH_SUCCESS:
            return { loading: false, success: action.payload };
        case MEDICAMENT_SEARCH_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}
function medicamentDetailsReducer(state= { medicament:[] }, action){

    switch (action.type){
        case MEDICAMENT_DETAILS_REQUEST:
            return {loading: true};
        case MEDICAMENT_DETAILS_SUCCESS:
            return {loading: false, medicament: action.payload};
        case MEDICAMENT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function medicamentSaveReducer(state= { medicament: {} }, action){

    switch (action.type){
        case MEDICAMENT_SAVE_REQUEST:
            return {loading: true};
        case MEDICAMENT_SAVE_SUCCESS:
            return {loading: false, success:true, medicament: action.payload};
        case MEDICAMENT_SAVE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function listMedicamentReducer(state= {medicaments:[]}, action){

    switch (action.type){
        case LIST_MEDICAMENT_REQUEST:
            return {loading: true, medicaments:[]};
        case LIST_MEDICAMENT_SUCCESS:
            return {loading: false, medicaments: action.payload};
        case LIST_MEDICAMENT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function medicamentDeleteReducer(state= { medicament:[] }, action){

    switch (action.type){
        case MEDICAMENT_DELETE_REQUEST:
            return {loading: true};
        case MEDICAMENT_DELETE_SUCCESS:
            return {loading: false, medicament: action.payload, success: true};
        case MEDICAMENT_DELETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function searchMedicamentLocalReducer(state = {success:[]}, action){
    switch (action.type) {
        case MEDICAMENT_SEARCH_REQUEST:
            return { loading: true };
        case MEDICAMENT_SEARCH_SUCCESS:
            return { loading: false, success: action.payload };
        case MEDICAMENT_SEARCH_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}
export { medicamentListReducer, medicamentDetailsReducer, medicamentSaveReducer, searchMedicamentReducer,listMedicamentReducer, medicamentDeleteReducer,searchMedicamentLocalReducer }