import React, { Component } from 'react';
import EmployeeForm from "./employeeForm";
import EmployeeGrid from "./employeeGrid";
import JlDrawer from "core/_drawer/";
import './style.less';

export default class EmployeeComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component">
        <EmployeeGrid onAdd={ this.props.employeeAdd } onRowClick= {this.props.onRowClick}/>
        <JlDrawer isVisible={this.props.formOpen} 
                  onClose={this.props.employeeCloseForm} 
                  onEdit={this.props.employeeEdit} 
                  onDelete={this.props.employeeDelete} 
                  mode={this.props.mode}
                  model={this.props.row}
                  title="Colaborador">
            <EmployeeForm 
                  mode={this.props.mode} 
                  onSave={this.props.employeeSave}
                  employee={this.props.employee}
                  loading={this.props.loading}>
            </EmployeeForm>
        </JlDrawer>
      </div>
    );
  }
}