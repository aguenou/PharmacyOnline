import { PANIER_ADD_ITEM,PANIER_CONFIRM_ITEM,PANIER_REMOVE_ITEM, PANIER_RESERV_ITEM } from "../constants/panierConstants";

function panierReducer(state = { panierItems: [] }, action) {
  switch (action.type) {
    case PANIER_ADD_ITEM:
      const item = action.payload;
      const medicament = state.panierItems.find(x => x.idMedicament === item.idMedicament);
      if (medicament) {
        return {
          panierItems: 
            state.panierItems.map(x => x.idMedicament === medicament.idMedicament ? item : x)
        };
      }
      return { panierItems: [...state.panierItems, item] };
    case PANIER_REMOVE_ITEM:
        return{ panierItems: state.panierItems.filter(x =>x.idMedicament !== action.payload)}
    default:
      return state
  }
}

function confirmPanierReducer(state= {}, action){

  switch (action.type){
      case PANIER_CONFIRM_ITEM:
          return {loading: false, confirmat: action.payload, success: true};
      default:
          return state;
  }
}

function reservPanierReducer(state= {}, action){

  switch (action.type){
      case PANIER_RESERV_ITEM:
          return {loading: false, reserv: action.payload, success: true};
      default:
          return state;
  }
}
export { panierReducer,confirmPanierReducer,reservPanierReducer }