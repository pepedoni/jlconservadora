import * as types from "./constants";
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