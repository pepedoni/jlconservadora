import * as types from "./constants";

export default function(state = {...state,  loadginMenu: false, screens: [] }, action) {
  switch (action.type) {
    case types.MENU_REQUEST:
      console.log(`[Auth Reducer] Action: MENU_REQUEST`);
      return {
        ...state, 
        loadginMenu: true,
        screens: []
      };
    case types.MENU_SUCCESS:
      console.log(`[Auth Reducer] Action: MENU_SUCCESS`);
      return {
        ...state, 
        loadginMenu: false,
        screens: action.payload
      }
    case types.MENU_FAILURE:
      console.log(`[Auth Reducer] Action: MENU_FAILURE`);
      return {
          ...state, 
          loadginMenu:false,
          screens: []
      }
    default:
      return state;
    }
}