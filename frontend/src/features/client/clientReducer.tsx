import * as types from "./constants";

export default function(state = { formOpen: false, mode: null, client: {}, loading: false }, action) {
  filterOpen: false
  switch (action.type) {
    case types.CLIENT_ADD:
      console.log(`[Client Reducer] Action: CLIENT_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        filterOpen: false,
        client: {name: '', type: '', syndic_ap: '', syndic_birthday: '', syndic_email: '', home_contact: '', phone_contact: '',
                 commerce_contact: '', manage_init: '', manage_end: '', cond_blocks: '', cond_floors: '', cond_aps: '',
                 cep: '', state: '', city: '', address: '', address_neighborhood: '', address_number: '', address_complement: ''}
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
        filterOpen: false
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
        filterOpen: false
      }
    case types.CLIENT_SAVE_FAILURE:
      console.log(`[Client Reducer] Action: CLIENT_SAVE_FAILURE`);
      return {
        ...state,
        formOpen: true,
        client: action.payload.client,
        mode: action.payload.mode,
        filterOpen: false
      }
    case types.CLIENT_OPEN_FILTER:
      console.log(`[Client Reducer] Action: CLIENT_OPEN_FILTER`);
      return {
        ...state,
        formOpen: false,
        filterOpen: true
      }
    case types.CLIENT_CLOSE_FILTER:
      console.log(`[Client Reducer] Action: CLIENT_CLOSE_FILTER`);
      return {
        ...state,
        formOpen: false,
        filterOpen: false
      }
    case types.LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
    }
}