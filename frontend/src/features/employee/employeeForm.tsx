import React, {Component} from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon,
  } from 'antd';
  
  
class Employee extends React.Component {

    constructor(props) {
        super(props);
    }
  
    render() {
      return (
        <Form>
            <h1>Teste</h1>
        </Form>
      );
    }
  }
  
const EmployeeForm = Form.create()(Employee);

export default EmployeeForm;