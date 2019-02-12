import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NewDeal from "features/pipeline/components/new";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(NewDeal);