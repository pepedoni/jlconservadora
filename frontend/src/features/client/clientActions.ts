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

const clientDistrictsSuccess = response => {
    return {
        type: types.CLIENT_DISTRICTS_SUCCESS,
        payload: response.data
    }
}

const clientDistrictsFailure = (error) => {
    return {
        type: types.CLIENT_DISTRICTS_FAILURE,
        payload: error  
    }
}

export const callLoading = (loading) => {
    return {
        type: types.CLIENT_LOADING,
        payload: loading
    }
}


export const clientSave = (client, mode) => (dispatch) => {
    dispatch(callLoading(true));
    if(mode == 'new') {
        request.post('/clients/insert', client).then( response =>  {
            dispatch(clientSaveSuccess(client));
            dispatch(callLoading(false));
        }).catch( error => {
            dispatch(clientSaveFailure({client: client, mode: mode}));
            dispatch(callLoading(false));
        });
    }
    else if(mode == 'edit') {
        request.put('/clients/update/' + client.id, client).then( response =>  {
            dispatch(clientSaveSuccess(client));
            dispatch(callLoading(false));
        }).catch( error => {
            dispatch(clientSaveFailure({client: client, mode: mode}));
            dispatch(callLoading(false));
        });
    }
}

export const clientOnFilter = (filter) => (dispatch) => {
    dispatch(callLoading(true));

    request.get('/clients/filter', { params: 
        { 
            name: filter.nome,
            cpfCnpj: filter.cpfCnpj,
            address: filter.rua,
            email: filter.email
        }
    }).then( response =>  {
        dispatch(clientFilterSuccess(response));
        dispatch(callLoading(false));
        
    }).catch( error => {
        dispatch(clientFilterFailure(error));
        dispatch(callLoading(false));
    });
}

export const clientFindDistricts = () => (dispatch) => {
    request.get('/clients/districts').then( response => {
        dispatch(clientDistrictsSuccess(response));
    }).catch( error => {
        dispatch(clientDistrictsFailure(error));
    });
}
