import React, {Component} from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon,
  } from 'antd';
  
  
class Client extends React.Component {

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
  
const ClientForm = Form.create()(Client);

export default ClientForm;