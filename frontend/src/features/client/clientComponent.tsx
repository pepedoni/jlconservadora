import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import ClientForm from './clientForm'
import ClientGrid from './clientGrid'

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
              filter={this.props.filter} clientFindDistricts={this.props.clientFindDistricts}
              clientDistricts={this.props.districts}/>
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.clientCloseForm} 
                        mode={this.props.mode}
                        title="Cliente"
                        loading={this.props.loading}>
                <ClientForm mode={this.props.mode} 
                            onSave={this.props.clientSave} 
                            client={this.props.client} 
                            loading={this.props.loading}
                            onEdit={this.props.clientEdit} 
                            onDelete={this.props.onDelete} 
                        callLoading={this.props.callLoading}/>
            </JlDrawer>
        </div>
      )
    }
}