import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clientAdd, clientEdit, clientView, clientSave, onDelete, 
    clientCloseForm, onRowClick, clientOpenFilter, clientCloseFilter,
    clientOnFilter, callLoading, clientFindDistricts } from './clientActions';
import Client from "./clientComponent";
// import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    formOpen: state.client.formOpen,
    mode: state.client.mode,
    client: state.client.client,
    filterOpen: state.client.filterOpen,
    filter: state.client.filter,
    loading: state.client.loading,
    districts: state.client.districts,
    errors: state.client.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        clientAdd, clientEdit, clientView, clientSave, onDelete,
            clientCloseForm, onRowClick, clientOpenFilter, clientCloseFilter,
            clientOnFilter, callLoading, clientFindDistricts
    },
    dispatch
);

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Client);