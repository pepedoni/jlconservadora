import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { serviceAdd, serviceEdit, serviceView, serviceSave, serviceDelete, serviceCloseForm, onRowClick } from './serviceActions';

import Service from "./serviceComponent";
// import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    formOpen: state.service.formOpen,
    mode: state.service.mode,
    service: state.service.service
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