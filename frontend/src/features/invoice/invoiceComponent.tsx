import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import InvoiceForm from './invoiceForm'
import InvoiceGrid from './invoiceGrid'

export default class InvoiceComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <InvoiceGrid onAdd={this.props.invoiceAdd} onRowClick= {this.props.onRowClick}
              openFilter={this.props.invoiceOpenFilter} filterOpen={this.props.filterOpen}
              invoiceCloseFilter={this.props.invoiceCloseFilter} invoiceOnFilter={this.props.invoiceOnFilter}
              filter={this.props.filter} />
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.invoiceCloseForm} 
                        onEdit={this.props.invoiceEdit} 
                        onDelete={this.props.invoiceDelete} 
                        mode={this.props.mode}
                        title="Nota Fiscal"
                        loading={this.props.loading}>
                <InvoiceForm mode={this.props.mode} 
                            onSave={this.props.invoiceSave} 
                            invoice={this.props.invoice} 
                            loading={this.props.loading}/>
            </JlDrawer>
        </div>
      )
    }
}