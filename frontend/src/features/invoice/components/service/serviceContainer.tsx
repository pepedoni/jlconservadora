import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { serviceAdd, serviceEdit, serviceView, serviceSave, serviceDelete, serviceCloseForm, onRowClick } from './serviceActions';

import Service from "./serviceComponent";
// import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    formOpen: state.invoiceService.formOpen,
    mode: state.invoiceService.mode,
    service: state.invoiceService.service,
    loading: state.invoiceService.loading,
    invoice_id: state.invoice.invoice.id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        serviceAdd, serviceEdit, serviceView, serviceSave, serviceDelete, serviceCloseForm, onRowClick
    },
    dispatch
);

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Service);