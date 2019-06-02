import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { invoiceAdd, invoiceEdit, invoiceView, invoiceSave, invoiceDelete, 
    invoiceCloseForm, onRowClick, invoiceOpenFilter, invoiceCloseFilter,
    invoiceOnFilter } from './invoiceActions';

import Invoice from "./invoiceComponent";
// import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    formOpen: state.invoice.formOpen,
    mode: state.invoice.mode,
    invoice: state.invoice.invoice,
    filterOpen: state.invoice.filterOpen,
    filter: state.invoice.filter,
    loading: state.invoice.loading,
    tabsAtivas: state.invoice.tabsAtivas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        invoiceAdd, invoiceEdit, invoiceView, invoiceSave, invoiceDelete,
            invoiceCloseForm, onRowClick, invoiceOpenFilter, invoiceCloseFilter,
            invoiceOnFilter
    },
    dispatch
);

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);