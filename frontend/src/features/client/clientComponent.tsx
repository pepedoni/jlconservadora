import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import ClientForm from './clientForm'
import ClientGrid from './clientGrid'
import ClientHeader from './clientHeader'

import './style.less';

export default class ClientComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <ClientGrid onAdd={this.props.clientAdd} onRowClick= {this.props.onRowClick} />
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