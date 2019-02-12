import * as types from "../constants";

/**
 * Login
 */
export const setCurrentLocation = (currentLocation) => {
  return { 
    type: types.CHANGE_APP_LOCATION,
    payload: currentLocation
 };
};