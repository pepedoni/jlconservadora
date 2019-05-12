import * as types from "./constants";
import request from "api/request";
/**
 * COMPANY
 */

export const companyAdd = () => {
    return { 
        type: types.COMPANY_ADD
    };
};

export const companyEdit = () => {
    return { 
        type: types.COMPANY_EDIT
 }  ;
};

export const companyView = () => {
    return {
        type: types.COMPANY_VIEW
    }
}

export const companyDelete= () => {
    return {
        type: types.COMPANY_DELETE
    }
}

export const companyCloseForm = () => {
    return { 
        type: types.COMPANY_CLOSEFORM
    }
};

export const onRowClick = (record) => {
    return {
        type: types.COMPANY_ON_ROW_CLICK,
        payload: record
    }
}

const companyRequest = () => {
    return {
        type: types.COMPANY_REQUEST
    }
};

const companySaveSuccess = (company) => {
    return {
        type: types.COMPANY_SAVE_SUCCESS,
        payload: company
    }
}

const companySaveFailure = (company) => {
    return {
        type: types.COMPANY_SAVE_FAILURE,
        payload: company
    }
}

export const callLoading = (loading) => {
    return {
        type: types.COMPANY_LOADING,
        payload: loading
    }
}

export const companySave = (company, mode) => (dispatch) => {
    dispatch(callLoading(true));
    if(mode == 'new') {
        request.post('/companies', company).then( response =>  {
            dispatch(companySaveSuccess(company));
            dispatch(callLoading(false));
            dispatch(companyCloseForm());
        }).catch( error => {
            dispatch(companySaveFailure({company: company, mode: mode}));
            dispatch(callLoading(false));
        });
    }
    else if(mode == 'edit') {
        request.put('/companies/' + company.id, company).then( response =>  {
            dispatch(companySaveSuccess(company));
            dispatch(callLoading(false));
        }).catch( error => {
            dispatch(companySaveFailure({company: company, mode: mode}));
            dispatch(callLoading(false));
        });
    }
}

export const onDelete = (company) => (dispatch) => {
    dispatch(callLoading(true));

    request.delete('/companies/' + company.id, company).then( response =>  {
        dispatch(companyCloseForm());
        dispatch(callLoading(false));
    }).catch( error => {
        dispatch(callLoading(false));
    });
}
