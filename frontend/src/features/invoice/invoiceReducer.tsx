import * as types from "./constants";

export default function(state = { formOpen: false, mode: null, invoice: {}, loading: false, filterOpen: true }, action) {
  switch (action.type) {
    case types.INVOICE_ADD:
      console.log(`[Invoice Reducer] Action: INVOICE_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        filterOpen: false,
        invoice: {name: '', type: '', syndic_ap: '', syndic_birthday: '', syndic_email: '', home_contact: '', phone_contact: '',
                 commerce_contact: '', manage_init: '', manage_end: '', cond_blocks: '', cond_floors: '', cond_aps: '', address: '', 
                 address_number: '', address_complement: '' }
      };
    case types.INVOICE_EDIT:
      console.log(`[Invoice Reducer] Action: INVOICE_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit',
        filterOpen: false
      };
    case types.INVOICE_VIEW:
      console.log(`[Invoice Reducer] Action: INVOICE_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view',
        filterOpen: false
      };
    case types.INVOICE_DELETE:
      console.log(`[Invoice Reducer] Action: INVOICE_DELETE`);
      return {
        ...state,
        formOpen: true,
        mode: 'delete',
        filterOpen: false
      };
    case types.INVOICE_CLOSEFORM:
      console.log(`[Invoice Reducer] Action: INVOICE_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: null,
        filterOpen: false
      }
    case types.INVOICE_ON_ROW_CLICK:
      console.log(`[Invoice Reducer] Action: INVOICE_ON_ROW_CLICK`);
      return {
        ...state,
        formOpen: true,
        invoice: action.payload,
        mode: 'view',
        filterOpen: false
      }
    case types.INVOICE_SAVE_SUCCESS:
      console.log(`[Invoice Reducer] Action: INVOICE_SAVE_SUCCESS`);
      return {
        ...state,
        formOpen: true,
        invoice: action.payload,
        mode: 'view',
        filterOpen: false
      }
    case types.INVOICE_SAVE_FAILURE:
      console.log(`[Invoice Reducer] Action: INVOICE_SAVE_FAILURE`);
      return {
        ...state,
        formOpen: true,
        invoice: action.payload.invoice,
        mode: action.payload.mode,
        filterOpen: false
      }
    case types.INVOICE_OPEN_FILTER:
      console.log(`[Invoice Reducer] Action: INVOICE_OPEN_FILTER`);
      return {
        ...state,
        formOpen: false,
        filterOpen: true
      }
    case types.INVOICE_CLOSE_FILTER:
      console.log(`[Invoice Reducer] Action: INVOICE_CLOSE_FILTER`);
      return {
        ...state,
        formOpen: false,
        filterOpen: false
      }
    case types.INVOICE_LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
    }
}