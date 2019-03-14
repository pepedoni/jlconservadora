import * as types from "./constants";
import { getData } from "core/_util/dateUtil";

export default function(state = { formOpen: false, mode: null, invoice: {}, loading: false, filterOpen: false, filter: Array() }, action) {
  switch (action.type) {
    case types.INVOICE_ADD:
      console.log(`[Invoice Reducer] Action: INVOICE_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        filterOpen: false,
        invoice: {date: getData(), provider_inscription: '' }
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