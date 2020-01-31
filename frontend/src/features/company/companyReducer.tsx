import * as types from "./constants";

export default function(state = { formOpen: false, mode: null, company: {}, loading: false, filter: Array() }, action) {
  switch (action.type) {
    case types.COMPANY_ADD:
      console.log(`[Company Reducer] Action: COMPANY_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'new',
        company: {municipal_inscription: '',  inscription: '',  name: '', taxation_regime: 5,  national_simple: 1,  cultural_promoter: 0,
                  cep: '', state: '', city: '', address: '', address_district: '', address_number: '', address_complement: '', certify_name: '',
                  certify_password: '', cnae: ''
        }
      };
    case types.COMPANY_EDIT:
      console.log(`[Company Reducer] Action: COMPANY_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit'
      };
    case types.COMPANY_VIEW:
      console.log(`[Company Reducer] Action: COMPANY_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view'
      };
    case types.COMPANY_DELETE:
      console.log(`[Company Reducer] Action: COMPANY_DELETE`);
      return {
        ...state,
        formOpen: false,
        mode: 'delete'
      };
    case types.COMPANY_CLOSEFORM:
      console.log(`[Company Reducer] Action: COMPANY_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: null
      }
    case types.COMPANY_ON_ROW_CLICK:
      console.log(`[Company Reducer] Action: COMPANY_ON_ROW_CLICK`);
      return {
        ...state,
        formOpen: true,
        company: action.payload,
        mode: 'view'
      }
    case types.COMPANY_SAVE_SUCCESS:
      console.log(`[Company Reducer] Action: COMPANY_SAVE_SUCCESS`);
      return {
        ...state,
        formOpen: true,
        company: action.payload,
        mode: 'view'
      }
    case types.COMPANY_SAVE_FAILURE:
    console.log(`[Company Reducer] Action: COMPANY_SAVE_FAILURE`);
    return {
      ...state,
      formOpen: true,
      company: action.payload.company,
      mode: action.payload.mode
    }
    case types.COMPANY_LOADING:  
    console.log(`[Company Reducer] Action: COMPANY_LOADING`);
    return {
      ...state,
      loading: action.payload
    }
    default:
      return state;
    }
}