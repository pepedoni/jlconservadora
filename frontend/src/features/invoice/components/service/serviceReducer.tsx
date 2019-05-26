import * as types from "../../../service/constants";

export default function(state = { formOpen: false, mode: null, service: {}, loading: false }, action) {
  switch (action.type) {
    case types.INVOICE_SERVICE_ADD:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        service: {name: '', item_list: '', aliquot: '', description: '' }
      };
    case types.INVOICE_SERVICE_EDIT:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit'
      };
    case types.INVOICE_SERVICE_VIEW:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view'
      };
    case types.INVOICE_SERVICE_DELETE:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_DELETE`);
      return {
        ...state,
        formOpen: true,
        mode: 'delete'
      };
    case types.INVOICE_SERVICE_CLOSEFORM:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: null
      }
    case types.INVOICE_SERVICE_ON_ROW_CLICK:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_ON_ROW_CLICK`);
      return {
        ...state,
        formOpen: true,
        service: action.payload,
        mode: 'view'
      }
    case types.INVOICE_SERVICE_SAVE_SUCCESS:
      console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_SAVE_SUCCESS`);
      return {
        ...state,
        formOpen: true,
        service: action.payload,
        mode: 'view'
      }
    case types.INVOICE_SERVICE_SAVE_FAILURE:
    console.log(`[Invoice Service Reducer] Action: INVOICE_SERVICE_SAVE_FAILURE`);
    return {
      ...state,
      formOpen: true,
      service: action.payload.service,
      mode: action.payload.mode
    }
    case types.INVOICE_SERVICE_LOADING:  
    console.log(`[Invoice Service Reducer] Action: LOADING`);
    return {
      ...state,
      loading: action.payload
    }
    default:
      return state;
    }
}