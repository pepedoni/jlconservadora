import React, { Component } from 'react'
import ClientGrid from './clientGrid'
import ClientForm from './clientForm'
import JlDrawer from "core/_drawer/"
import AddButton from "core/_fab/index"
import ClientHeader from './clientHeader'
import { Button } from 'antd';
import './style.less';

export default class ClientComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <ClientHeader onAdd={this.props.clientAdd}/>
            <ClientGrid onRowClick= {this.props.onRowClick} />
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.clientCloseForm} 
                        onEdit={this.props.clientEdit} 
                        onDelete={this.props.clientDelete} 
                        mode={this.props.mode}
                        title="Cliente">
                <ClientForm mode={this.props.mode} onSave={this.props.clientSave} client={this.props.client}/>
            </JlDrawer>
        </div>
      )
    }
}