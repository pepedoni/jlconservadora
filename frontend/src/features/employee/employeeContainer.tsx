import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { employeeAdd, employeeEdit, employeeView, employeeDelete, employeeCloseForm, employeeSave, onRowClick } from './employeeActions';
import Employee from "./employeeComponent";

const mapStateToProps = state => ({
  formOpen: state.employee.formOpen,
  mode: state.employee.mode,
  employee: state.employee.employee,
  loading: state.employee.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { employeeAdd, employeeEdit, employeeView, employeeDelete, employeeCloseForm, employeeSave, onRowClick },
    dispatch
  );

// Connects the entry-component and makes it the default export.
export default connect(mapStateToProps, mapDispatchToProps)(Employee);