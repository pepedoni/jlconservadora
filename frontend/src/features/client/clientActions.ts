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


export const clientOpenFilter = () => {
    return {
        type: types.CLIENT_OPEN_FILTER
    }
}

export const clientCloseFilter = () => {
    return {
        type: types.CLIENT_CLOSE_FILTER
    }
}


const clientFilterSuccess = response => {
    return {
        type: types.CLIENT_FILTER_SUCCESS,
        payload: response.data
    }
}

const clientFilterFailure = (error) => {
    return {
        type: types.CLIENT_FILTER_FAILURE,
        payload: error
    }
}

const loading = (loading) => {
    return {
        type: types.LOADING,
        payload: loading
    }
}


export const clientSave = (client, mode) => (dispatch) => {
    dispatch(loading(true));
    if(mode == 'new') {
        request.post('/clients/insert', client).then( response =>  {
            dispatch(clientSaveSuccess(client));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(clientSaveFailure({client: client, mode: mode}));
            dispatch(loading(false));
        });
    }
    else if(mode == 'edit') {
        request.put('/clients/update/' + client.id, client).then( response =>  {
            dispatch(clientSaveSuccess(client));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(clientSaveFailure({client: client, mode: mode}));
            dispatch(loading(false));
        });
    }
}

export const clientOnFilter = (filter) => (dispatch) => {
    dispatch(loading(true));

    request.get('/clients?', filter).then( response =>  {
        dispatch(clientFilterSuccess(response));
        dispatch(loading(false));
    }).catch( error => {
        dispatch(clientFilterFailure(error));
        dispatch(loading(false));
    });
}
