import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { companyAdd, companyEdit, companyView, companySave, companyDelete, companyCloseForm, onRowClick, callLoading, onDelete } from './companyActions';

import Company from "./companyComponent";

const mapStateToProps = state => ({
    formOpen: state.company.formOpen,
    mode: state.company.mode,
    company: state.company.company,
    filter: state.company.filter,
    loading: state.company.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        companyAdd, companyEdit, companyView, companySave, companyDelete, companyCloseForm, onRowClick, callLoading, onDelete
    },
    dispatch
);

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Company);