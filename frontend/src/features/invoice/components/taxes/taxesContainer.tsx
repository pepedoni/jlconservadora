import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Taxes from "./taxesComponent";
// import {withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    invoice_id: state.invoice.invoice.id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
);

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Taxes);