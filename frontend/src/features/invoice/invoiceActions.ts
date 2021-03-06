import * as types from "./constants";
import request from "api/request";
/**
 * INVOICE
 */

export const invoiceAdd = () => {
    return { 
        type: types.INVOICE_ADD
    };
};

export const invoiceEdit = () => {
    return { 
        type: types.INVOICE_EDIT
 }  ;
};

export const invoiceView = () => {
    return {
        type: types.INVOICE_VIEW
    }
}

export const invoiceCloseForm = () => {
    return { 
        type: types.INVOICE_CLOSEFORM
    }
};

export const onRowClick = (record) => {
    return {
        type: types.INVOICE_ON_ROW_CLICK,
        payload: record
    }
}

const invoiceSaveSuccess = (invoice) => {
    return {
        type: types.INVOICE_SAVE_SUCCESS,
        payload: invoice
    }
}

const invoiceSaveFailure = (invoice) => {
    return {
        type: types.INVOICE_SAVE_FAILURE,
        payload: invoice
    }
}


export const invoiceOpenFilter = () => {
    return {
        type: types.INVOICE_OPEN_FILTER
    }
}

export const invoiceCloseFilter = () => {
    return {
        type: types.INVOICE_CLOSE_FILTER
    }
}


const invoiceFilterSuccess = response => {
    return {
        type: types.INVOICE_FILTER_SUCCESS,
        payload: response.data
    }
}

const invoiceFilterFailure = (error) => {
    return {
        type: types.INVOICE_FILTER_FAILURE,
        payload: error
    }
}

const loading = (loading) => {
    return {
        type: types.INVOICE_LOADING,
        payload: loading
    }
}

const invoiceTransmitSuccess = () => {
    return {
        type: types.INVOICE_TRANSMIT_SUCCESS
    }
}

const invoiceTransmitFailure = () => {
    return {
        type: types.INVOICE_TRANSMIT_FAILURE
    }
}

export const invoiceSave = (invoice, mode) => (dispatch) => {
    dispatch(loading(true));
    if(mode == 'new') {
        request.post('/invoice', invoice).then( response =>  {
            invoice.id = response.data.id;
            dispatch(invoiceSaveSuccess(invoice));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(invoiceSaveFailure({invoice: invoice, mode: mode}));
            dispatch(loading(false));
        });
    }
    else if(mode == 'edit') {
        request.put('/invoice/' + invoice.id, invoice).then( response =>  {
            dispatch(invoiceSaveSuccess(invoice));
            dispatch(loading(false));
        }).catch( error => {
            dispatch(invoiceSaveFailure({invoice: invoice, mode: mode}));
            dispatch(loading(false));
        });
    }
}

export const invoiceOnFilter = (filter) => (dispatch) => {
    dispatch(loading(true));

    request.get('/invoice?', filter).then( response =>  {
        dispatch(invoiceFilterSuccess(response));
        dispatch(loading(false));
    }).catch( error => {
        dispatch(invoiceFilterFailure(error));
        dispatch(loading(false));
    });
}

export const transmitInvoice = (invoices) => (dispatch) => {
    dispatch(loading(true));

    request.post('/invoice/transmitInvoice', invoices).then( response => {
        dispatch(invoiceTransmitSuccess());
        dispatch(loading(false));
    }).catch( error => {
        dispatch(invoiceTransmitFailure());
        dispatch(loading(false));
    });

}

export const invoiceDelete = (invoice) => (dispatch) => {
    dispatch(loading(true));

    request.delete('/invoice/' + invoice.id, invoice).then( response =>  {
        dispatch(invoiceCloseForm());
        dispatch(loading(false));
    }).catch( error => {
        dispatch(loading(false));
    });
}
