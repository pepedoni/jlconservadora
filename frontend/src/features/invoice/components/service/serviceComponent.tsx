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
            <ServiceGrid onAdd={this.props.serviceAdd} onRowClick= {this.props.onRowClick} filters={{invoice_id: this.props.invoice_id}} url="invoice/services" />
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.serviceCloseForm} 
                        onEdit={this.props.serviceEdit} 
                        onDelete={this.props.serviceDelete} 
                        mode={this.props.mode}
                        title="Serviço">
                <ServiceForm 
                        mode={this.props.mode} 
                        onSave={this.props.serviceSave} 
                        onEdit={this.props.serviceEdit} 
                        service={this.props.service}
                        loading={this.props.loading}
                        invoice_id={this.props.invoice_id}
                        view={this.props.serviceView}/>
            </JlDrawer>
        </div>
      )
    }
}