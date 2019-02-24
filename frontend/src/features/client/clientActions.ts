import * as types from "./constants";
import request from "api/request";
/**
 * CLIENT
 */

export const clientAdd = () => {
    return { 
        type: types.CLIENT_ADD
    };
};

export const clientEdit = () => {
    return { 
        type: types.CLIENT_EDIT
 }  ;
};

export const clientView = () => {
    return {
        type: types.CLIENT_VIEW
    }
}

export const clientDelete= () => {
    return {
        type: types.CLIENT_DELETE
    }
}

export const clientCloseForm = () => {
    return { 
        type: types.CLIENT_CLOSEFORM
    }
};

export const onRowClick = (record) => {
    return {
        type: types.CLIENT_ON_ROW_CLICK,
        payload: record
    }
}

const clientRequest = () => {
    return {
        type: types.CLIENT_REQUEST
    }
};

const clientSaveSuccess = (client) => {
    return {
        type: types.CLIENT_SAVE_SUCCESS,
        payload: client
    }
}

const clientSaveFailure = (client) => {
    return {
        type: types.CLIENT_SAVE_FAILURE,
        payload: client
    }
}

export const clientSave = (client, mode) => (dispatch) => {
    dispatch(clientRequest);
    if(mode == 'new') {
        request.post('/clients/insert', client).then( response =>  {
            dispatch(clientSaveSuccess(client));
        }).catch( error => {
            dispatch(clientSaveFailure({client: client, mode: mode}));
        });
    }
    else if(mode == 'edit') {
        request.put('/clients/update/' + client.id, client).then( response =>  {
            dispatch(clientSaveSuccess(client));
        }).catch( error => {
            dispatch(clientSaveFailure({client: client, mode: mode}));
        });
    }
}