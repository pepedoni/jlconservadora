import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clientAdd, clientEdit, clientView, clientDelete, clientCloseForm, onRowClick } from './clientActions';

import Client from "./clientComponent";

// import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    formOpen: state.client.formOpen,
    mode: state.client.mode
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        clientAdd, clientEdit, clientView, clientDelete, clientCloseForm, onRowClick
    },
    dispatch
);

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Client);