import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Contacts from "features/contacts/components/list";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

// Connects the entry-component and makes it the default export.
export default Contacts;