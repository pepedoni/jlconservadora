import * as types from "./constants";

export default function(state = { formOpen: false, mode: null, service: {} }, action) {
  switch (action.type) {
    case types.SERVICE_ADD:
      console.log(`[Service Reducer] Action: SERVICE_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        service: {name: '', item_list: '', aliquot: '', description: '' }
      };
    case types.SERVICE_EDIT:
      console.log(`[Service Reducer] Action: SERVICE_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit'
      };
    case types.SERVICE_VIEW:
      console.log(`[Service Reducer] Action: SERVICE_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view'
      };
    case types.SERVICE_DELETE:
      console.log(`[Service Reducer] Action: SERVICE_DELETE`);
      return {
        ...state,
        formOpen: true,
        mode: 'delete'
      };
    case types.SERVICE_CLOSEFORM:
      console.log(`[Service Reducer] Action: SERVICE_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: null
      }
    case types.SERVICE_ON_ROW_CLICK:
      console.log(`[Service Reducer] Action: SERVICE_ON_ROW_CLICK`);
      return {
        ...state,
        formOpen: true,
        service: action.payload,
        mode: 'view'
      }
    case types.SERVICE_SAVE_SUCCESS:
      console.log(`[Service Reducer] Action: SERVICE_SAVE_SUCCESS`);
      return {
        ...state,
        formOpen: true,
        service: action.payload,
        mode: 'view'
      }
    case types.SERVICE_SAVE_FAILURE:
    console.log(`[Service Reducer] Action: SERVICE_SAVE_FAILURE`);
    return {
      ...state,
      formOpen: true,
      service: action.payload.service,
      mode: action.payload.mode
    }
    default:
      return state;
    }
}