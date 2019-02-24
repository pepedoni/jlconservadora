import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import ClientForm from './clientForm'
import ClientGrid from './clientGrid'

import './style.less';

export default class ClientComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <ClientGrid onAdd={this.props.clientAdd} onRowClick= {this.props.onRowClick}
              openFilter={this.props.clientOpenFilter} filterOpen={this.props.filterOpen}
              clientCloseFilter={this.props.clientCloseFilter} clientOnFilter={this.props.clientOnFilter}
              filter={this.props.filter} />
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