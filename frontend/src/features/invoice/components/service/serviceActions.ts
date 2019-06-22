import * as types from "../../../service/constants";
import request from "api/request";
/**
 * SERVICE
 */

export const serviceAdd = () => {
    return { 
        type: types.INVOICE_SERVICE_ADD
    };
};

export const serviceEdit = () => {
    return { 
        type: types.INVOICE_SERVICE_EDIT
 }  ;
};

export const serviceView = () => {
    return {
        type: types.INVOICE_SERVICE_VIEW
    }
}

export const serviceDelete= () => {
    return {
        type: types.INVOICE_SERVICE_DELETE
    }
}

export const serviceCloseForm = () => {
    return { 
        type: types.INVOICE_SERVICE_CLOSEFORM
    }
};

export const onRowClick = (record) => {
    return {
        type: types.INVOICE_SERVICE_ON_ROW_CLICK,
        payload: record
    }
}

const serviceRequest = () => {
    return {
        type: types.INVOICE_SERVICE_REQUEST
    }
};

const serviceSaveSuccess = (service) => {
    return {
        type: types.INVOICE_SERVICE_SAVE_SUCCESS,
        payload: service
    }
}

const serviceSaveFailure = (service) => {
    return {
        type: types.INVOICE_SERVICE_SAVE_FAILURE,
        payload: service
    }
}

const loading = (loading) => {
    return {
        type: types.INVOICE_SERVICE_LOADING,
        payload: loading
    }
}

export const serviceSave = (service, mode) => (dispatch) => {
    dispatch(loading(true));
    if(mode == 'new') {
        request.post('/invoice/services', service).then( response =>  {
            dispatch(serviceSaveSuccess(service));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(serviceSaveFailure({service: service, mode: mode}));
            dispatch(loading(false));
        });
    }
    else if(mode == 'edit') {
        request.put('/invoice/services/' + service.id, service).then( response =>  {
            dispatch(serviceSaveSuccess(service));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(serviceSaveFailure({service: service, mode: mode}));
            dispatch(loading(false));
        });
    }
}