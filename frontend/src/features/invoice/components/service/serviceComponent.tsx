import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import ServiceForm from './serviceForm'
import ServiceGrid from '../../../service/serviceGrid'

export default class ServiceComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <ServiceGrid onAdd={this.props.serviceAdd} onRowClick= {this.props.onRowClick} url="invoice/services" />
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.serviceCloseForm} 
                        onEdit={this.props.serviceEdit} 
                        onDelete={this.props.serviceDelete} 
                        mode={this.props.mode}
                        title="Serviço">
                <ServiceForm 
                        mode={this.props.mode} 
                        onSave={this.props.serviceSave} 
                        service={this.props.service}
                        loading={this.props.loading}/>
            </JlDrawer>
        </div>
      )
    }
}