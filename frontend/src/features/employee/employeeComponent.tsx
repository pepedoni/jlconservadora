import React, { Component } from 'react';
import AddButton from "core/_fab/index";
import EmployeeForm from "./employeeForm";
import EmployeeGrid from "./employeeGrid";
import EmployeeHeader from './employeeHeader';
import JlDrawer from "core/_drawer/";
import './style.less';

export default class EmployeeComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component">
        <EmployeeHeader onAdd={this.props.employeeAdd}/>
        <EmployeeGrid />
        <JlDrawer isVisible={this.props.formOpen} 
                  onClose={this.props.employeeCloseForm} 
                  onEdit={this.props.employeeEdit} 
                  onDelete={this.props.employeeDelete} 
                  mode={this.props.mode}
                  model={this.props.row}
                  title="Adicionar Colaborador">
            <EmployeeForm 
                  mode={this.props.mode} 
                  onSave={this.props.employeeSave}>
            </EmployeeForm>
        </JlDrawer>
        <AddButton onClick={this.props.employeeAdd}/>
      </div>
    );
  }
}