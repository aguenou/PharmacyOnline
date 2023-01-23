import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { medicamentListReducer, medicamentDetailsReducer, medicamentSaveReducer, searchMedicamentReducer, listMedicamentReducer, medicamentDeleteReducer, searchMedicamentLocalReducer } from './reducers/medicamentReducers';
import {confirmPanierReducer, panierReducer, reservPanierReducer} from './reducers/panierReducers';
import Cookie from 'js-cookie';
import { useCookies } from 'react-cookie';
import { userSigninReducer, userRegisterReducer, pharmRegisterReducer, pharmSigninReducer, profilReducer, profilReservReducer, deleteReservReducer, confirmReservReducer, achatFinalReducer, reservReducer,nonReducer, deleteAchatReducer, confirmAchetReducer } from './reducers/userReducers';
import { positionListReducer, villeListReducer } from './reducers/villeReducers';

const panierItems = Cookie.getJSON("panierItems") || [];
const medicaments = Cookie.getJSON("medicaments") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const userInfoSignin = Cookie.getJSON("userInfoSignin") || null;
const userInfoSigninPharm = Cookie.getJSON("userInfoSigninPharm") || null;
const userInfoPharm = Cookie.getJSON("userInfoPharm") || null;
const initialState = { panier: { panierItems }, userRegister:{ userInfo }, userSignin:{ userInfoSignin }, pharmRegister:{ userInfoPharm },pharmSignin:{ userInfoSigninPharm },listMedicament: { medicaments } };
const reducer = combineReducers({
    medicamentList: medicamentListReducer,
    medicamentDetails: medicamentDetailsReducer,
    villeList:villeListReducer,
    positionList:positionListReducer,
    panier: panierReducer,
    userSignin: userSigninReducer,
    pharmSignin:pharmSigninReducer,
    userRegister: userRegisterReducer,
    pharmRegister: pharmRegisterReducer,
    medicamentSave: medicamentSaveReducer,
    searchMedicament: searchMedicamentReducer,
    listMedicament:listMedicamentReducer,
    medicamentDelete:medicamentDeleteReducer,
    confirmat:confirmPanierReducer,
    profilUser:profilReducer,
    reserv:reservPanierReducer,
    profilReservUser:profilReservReducer,
    medicamentReserv:deleteReservReducer,
    medicamentReservConfirm:confirmReservReducer,
    finalAchat:achatFinalReducer,
    reservAchat:reservReducer,
    nonFinal:nonReducer,
    pharmDelete:deleteAchatReducer,
    pharmAchat:confirmAchetReducer,
    medicamentSearch:searchMedicamentLocalReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;