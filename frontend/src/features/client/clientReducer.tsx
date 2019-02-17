import * as types from "./constants";

export default function(state = { formOpen: false, mode: null, client: {} }, action) {
  switch (action.type) {
    case types.CLIENT_ADD:
      console.log(`[Client Reducer] Action: CLIENT_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        client: {name: '', address: '', syndic_email: ''}
      };
    case types.CLIENT_EDIT:
      console.log(`[Client Reducer] Action: CLIENT_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit'
      };
    case types.CLIENT_VIEW:
      console.log(`[Client Reducer] Action: CLIENT_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view'
      };
    case types.CLIENT_DELETE:
      console.log(`[Client Reducer] Action: CLIENT_DELETE`);
      return {
        ...state,
        formOpen: true,
        mode: 'delete'
      };
    case types.CLIENT_CLOSEFORM:
      console.log(`[Client Reducer] Action: CLIENT_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: null
      }
    case types.CLIENT_ON_ROW_CLICK:
      console.log(`[Client Reducer] Action: CLIENT_ON_ROW_CLICK`);
      return {
        ...state,
        formOpen: true,
        client: action.payload,
        mode: 'view'
      }
    case types.CLIENT_SAVE_SUCCESS:
      console.log(`[Client Reducer] Action: CLIENT_SAVE_SUCCESS`);
      return {
        ...state,
        formOpen: true,
        client: action.payload,
        mode: 'view'
      }
    case types.CLIENT_SAVE_FAILURE:
    console.log(`[Client Reducer] Action: CLIENT_SAVE_FAILURE`);
    return {
      ...state,
      formOpen: true,
      client: action.payload.client,
      mode: action.payload.mode
    }
    default:
      return state;
    }
}