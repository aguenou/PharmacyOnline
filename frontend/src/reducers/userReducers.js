const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, PHARM_REGISTER_REQUEST, PHARM_REGISTER_SUCCESS, PHARM_REGISTER_FAIL, PROFIL_SHOW_ACHAT, PROFIL_SHOW_RESERV, MEDICAMENT_CANCEL_REQUEST, MEDICAMENT_CANCEL_SUCCESS, MEDICAMENT_CANCEL_FAIL, MEDICAMENT_CONFIRM_REQUEST, MEDICAMENT_CONFIRM_SUCCESS, MEDICAMENT_CONFIRM_FAIL, PHARM_SHOW_ACHATFINAL, PHARM_SHOW_ACHAT, PHARM_SHOW_RESERV } = require("../constants/userConstants");


function userSigninReducer(state = {}, action){
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfoSignin: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

function pharmSigninReducer(state = {}, action){
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfoSigninPharm: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

function userRegisterReducer(state = {}, action){
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

 function pharmRegisterReducer(state = {}, action){
    switch (action.type) {
        case PHARM_REGISTER_REQUEST:
            return { loading: true };
        case PHARM_REGISTER_SUCCESS:
            return { loading: false, userInfoPharm: action.payload };
        case PHARM_REGISTER_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

function profilReducer(state= { profile:[] }, action){

    switch (action.type){
        case PROFIL_SHOW_ACHAT:
            return {loading: false, profile: action.payload};
        default:
            return state;
    }
  }

  function profilReservReducer(state= { profileReserv:[] }, action){

    switch (action.type){
        case PROFIL_SHOW_RESERV:
            return {loading: false, profileReserv: action.payload};
        default:
            return state;
    }
  }

  function deleteReservReducer(state= { reserv:[] }, action){

    switch (action.type){
        case MEDICAMENT_CANCEL_REQUEST:
            return {loading: true};
        case MEDICAMENT_CANCEL_SUCCESS:
            return {loading: false, reserv: action.payload, success: true};
        case MEDICAMENT_CANCEL_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function confirmReservReducer(state= { confirm:[] }, action){

    switch (action.type){
        case MEDICAMENT_CONFIRM_REQUEST:
            return {loading: true};
        case MEDICAMENT_CONFIRM_SUCCESS:
            return {loading: false, reserv: action.payload, success: true};
        case MEDICAMENT_CONFIRM_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function achatFinalReducer(state= { achatFinal:[] }, action){

    switch (action.type){
        case PHARM_SHOW_ACHATFINAL:
            return {loading: false, achatFinal: action.payload};
        default:
            return state;
    }
  }

  function nonReducer(state= { achat:[] }, action){

    switch (action.type){
        case PHARM_SHOW_ACHAT:
            return {loading: false, achat: action.payload};
        default:
            return state;
    }
  }

  function reservReducer(state= { reservConsult:[] }, action){

    switch (action.type){
        case PHARM_SHOW_RESERV:
            return {loading: false, reservConsult: action.payload};
        default:
            return state;
    }
  }

  function deleteAchatReducer(state= { reserv:[] }, action){

    switch (action.type){
        case MEDICAMENT_CANCEL_REQUEST:
            return {loading: true};
        case MEDICAMENT_CANCEL_SUCCESS:
            return {loading: false, reserv: action.payload, success: true};
        case MEDICAMENT_CANCEL_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function confirmAchetReducer(state= { confirm:[] }, action){

    switch (action.type){
        case MEDICAMENT_CONFIRM_REQUEST:
            return {loading: true};
        case MEDICAMENT_CONFIRM_SUCCESS:
            return {loading: false, reserv: action.payload, success: true};
        case MEDICAMENT_CONFIRM_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}
export { userSigninReducer, userRegisterReducer, pharmRegisterReducer,pharmSigninReducer,profilReducer,profilReservReducer,deleteReservReducer,confirmReservReducer,achatFinalReducer,nonReducer, reservReducer,deleteAchatReducer,confirmAchetReducer }