import { VILLE_LIST_REQUEST, VILLE_LIST_SUCCESS, VILLE_LIST_FAIL, POSITION_LIST_REQUEST, POSITION_LIST_SUCCESS, POSITION_LIST_FAIL } from "../constants/villeConstants";

function villeListReducer(state= {ville:[]}, action){

    switch (action.type){
        case VILLE_LIST_REQUEST:
            return {loadingVille: true};
        case VILLE_LIST_SUCCESS:
            return {loadingVille: false, ville: action.payload};
        case VILLE_LIST_FAIL:
            return {loadingVille: false, errorVille: action.payload};
        default:
            return state;
    }
}

function positionListReducer(state= {position:[]}, action){

    switch (action.type){
        case POSITION_LIST_REQUEST:
            return {loadingPosition: true};
        case POSITION_LIST_SUCCESS:
            return {loadingPosition: false, position: action.payload};
        case POSITION_LIST_FAIL:
            return {loadingPosition: false, errorPosition: action.payload};
        default:
            return state;
    }
}

export { villeListReducer,positionListReducer }