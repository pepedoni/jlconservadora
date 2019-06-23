import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import ServiceForm from './serviceForm'
import ServiceGrid from './serviceGrid'

export default class ServiceComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <ServiceGrid onAdd={this.props.serviceAdd} onRowClick= {this.props.onRowClick} />
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.serviceCloseForm} 
                        mode={this.props.mode}
                        title="Serviço">
                <ServiceForm 
                        mode={this.props.mode} 
                        onEdit={this.props.serviceEdit}
                        onSave={this.props.serviceSave} 
                        onDelete={this.props.serviceDelete} 
                        service={this.props.service}
                        loading={this.props.loading}
                        view={this.props.serviceView}/>
            </JlDrawer>
        </div>
      )
    }
}