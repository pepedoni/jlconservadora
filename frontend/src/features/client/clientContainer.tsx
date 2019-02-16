import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { login } from "./authActions";

import Client from "./clientComponent";

import {withRouter} from "react-router-dom";

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   loadingLogin: state.auth.loadingLogin,
//   errorLogin: state.auth.errorLogin
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       login
//     },
//     dispatch
//   );

// Connects the entry-component and makes it the default export.
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Client