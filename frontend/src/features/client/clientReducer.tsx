import * as types from "./constants";


export default function(state = { formOpen: false, mode: null, client: {}, loading: false, filterOpen: true, filter: Array(), errors: {}}, action) {
  switch (action.type) {
    case types.CLIENT_ADD:
      console.log(`[Client Reducer] Action: CLIENT_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        filterOpen: false,
        client: {name: '', type: '', syndic_ap: '', syndic_birthday: '', syndic_email: '', home_contact: '', phone_contact: '',
                 home_contact: '', manage_init: '', inscription: '', manage_end: '', cond_blocks: '', cond_floors: '', cond_aps: '',
                 cep: '', state: '', city: '', address: '', address_district: '', address_number: '', address_complement: '', 
                 client_email: '', city_ibge_code: ''}
      };
    case types.CLIENT_EDIT:
      console.log(`[Client Reducer] Action: CLIENT_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit',
        filterOpen: false
      };
    case types.CLIENT_VIEW:
      console.log(`[Client Reducer] Action: CLIENT_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view',
        filterOpen: false
      };
    case types.CLIENT_DELETE:
      console.log(`[Client Reducer] Action: CLIENT_DELETE`);
      return {
        ...state,
        formOpen: true,
        mode: 'delete',
        filterOpen: false
      };
    case types.CLIENT_CLOSEFORM:
      console.log(`[Client Reducer] Action: CLIENT_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: 'list',
        filterOpen: false,
        errors: {}
      }
    case types.CLIENT_ON_ROW_CLICK:
      console.log(`[Client Reducer] Action: CLIENT_ON_ROW_CLICK`);
      return {
        ...state,
        formOpen: true,
        client: action.payload,
        mode: 'view',
        filterOpen: false
      }
    case types.CLIENT_SAVE_SUCCESS:
      console.log(`[Client Reducer] Action: CLIENT_SAVE_SUCCESS`);
      return {
        ...state,
        formOpen: true,
        client: action.payload,
        mode: 'view',
        filterOpen: false,
        errors: {}
      }
    case types.CLIENT_SAVE_FAILURE:
      console.log(`[Client Reducer] Action: CLIENT_SAVE_FAILURE`);
      return {
        ...state,
        formOpen: true,
        client: action.payload.client,
        mode: action.payload.mode,
        filterOpen: false,
        errors: action.payload.errors || {}
      }
    case types.CLIENT_OPEN_FILTER:
      console.log(`[Client Reducer] Action: CLIENT_OPEN_FILTER`);
      return {
        ...state,
        formOpen: false,
        filterOpen: true,
        errors: {}
      }
    case types.CLIENT_CLOSE_FILTER:
      console.log(`[Client Reducer] Action: CLIENT_CLOSE_FILTER`);
      return {
        ...state,
        formOpen: false,
        filterOpen: false
      }
    case types.CLIENT_DISTRICTS_SUCCESS:
      console.log(`[Client Reducer] Action: CLIENT_DISTRICTS_SUCCESS`);
      return {
        ...state,
        districts: action.payload
      }
    case types.CLIENT_DISTRICTS_FAILURE:
      console.log(`[Client Reducer] Action: CLIENT_DISTRICTS_FAILURE`);
      return {
        ...state
      }
    case types.CLIENT_FILTER_SUCCESS:
      console.log(`[Client Reducer] Action: CLIENT_FILTER_SUCCESS`);
      return {
        ...state,
        formOpen: false,
        filterOpen: false,
        filter: action.payload
      }
    case types.CLIENT_FILTER_FAILURE:
      console.log(`[Client Reducer] Action: CLIENT_FILTER_FAILURE`);
      return {
        ...state,
        formOpen: false,
        filterOpen: true
      }
    case types.CLIENT_LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
    }
}