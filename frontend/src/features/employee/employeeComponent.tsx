import { Table } from 'antd';
import React, { Component } from 'react';
import AddButton from "core/_fab/index";
import EmployeeForm from "./employeeForm";
import JlDrawer from "core/_drawer/";
import './style.less';

export default class EmployeeComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component">
        <JlDrawer isVisible={this.props.formOpen} 
                  onClose={this.props.employeeCloseForm} 
                  onEdit={this.props.employeeEdit} 
                  onDelete={this.props.employeeDelete} 
                  mode={this.props.mode}
                  title="Adicionar Colaborador">
            <EmployeeForm mode={this.props.mode}></EmployeeForm>
        </JlDrawer>
        <AddButton onClick={this.props.employeeAdd}/>
      </div>
    );
  }
}