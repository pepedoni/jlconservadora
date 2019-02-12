import * as types from "../constants";

export default function(state = { currentLocation: {} }, action) {
  switch (action.type) {
    case types.CHANGE_APP_LOCATION:
      console.log(`[Components Reducer] Action: CHANGE_APP_LOCATION`);
      return {
        currentLocation: action.payload
      };
    default:
      return state;
    }
}