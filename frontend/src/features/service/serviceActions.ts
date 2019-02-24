import * as types from "./constants";
import request from "api/request";
/**
 * SERVICE
 */

export const serviceAdd = () => {
    return { 
        type: types.SERVICE_ADD
    };
};

export const serviceEdit = () => {
    return { 
        type: types.SERVICE_EDIT
 }  ;
};

export const serviceView = () => {
    return {
        type: types.SERVICE_VIEW
    }
}

export const serviceDelete= () => {
    return {
        type: types.SERVICE_DELETE
    }
}

export const serviceCloseForm = () => {
    return { 
        type: types.SERVICE_CLOSEFORM
    }
};

export const onRowClick = (record) => {
    return {
        type: types.SERVICE_ON_ROW_CLICK,
        payload: record
    }
}

const serviceRequest = () => {
    return {
        type: types.SERVICE_REQUEST
    }
};

const serviceSaveSuccess = (service) => {
    return {
        type: types.SERVICE_SAVE_SUCCESS,
        payload: service
    }
}

const serviceSaveFailure = (service) => {
    return {
        type: types.SERVICE_SAVE_FAILURE,
        payload: service
    }
}

export const serviceSave = (service, mode) => (dispatch) => {
    dispatch(serviceRequest);
    if(mode == 'new') {
        request.post('/service/insert', service).then( response =>  {
            dispatch(serviceSaveSuccess(service));
        }).catch( error => {
            dispatch(serviceSaveFailure({service: service, mode: mode}));
        });
    }
    else if(mode == 'edit') {
        request.put('/service/update/' + service.id, service).then( response =>  {
            dispatch(serviceSaveSuccess(service));
        }).catch( error => {
            dispatch(serviceSaveFailure({service: service, mode: mode}));
        });
    }
}