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

const serviceDelete= () => {
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

const loading = (loading) => {
    return {
        type: types.SERVICE_LOADING,
        payload: loading
    }
}

export const serviceSave = (service, mode) => (dispatch) => {
    dispatch(loading(true));
    if(mode == 'new') {
        request.post('/services', service).then( response =>  {
            dispatch(serviceSaveSuccess(service));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(serviceSaveFailure({service: service, mode: mode}));
            dispatch(loading(false));
        });
    }
    else if(mode == 'edit') {
        request.put('/services/' + service.id, service).then( response =>  {
            dispatch(serviceSaveSuccess(service));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(serviceSaveFailure({service: service, mode: mode}));
            dispatch(loading(false));
        });
    }
}

export const onDelete = (service) => (dispatch) => {
    dispatch(loading(true));

    request.delete('/services/' + service.id, service).then( response =>  {
        dispatch(serviceDelete());
        dispatch(loading(false));
    }).catch( error => {
        dispatch(loading(false));
    });
}