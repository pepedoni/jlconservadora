import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"
import { Tabs } from 'antd'
import InvoiceForm from './invoiceForm'
import ServicesForm from './servicesForm'
import InvoiceGrid from './invoiceGrid'
import ServiceContainer from './components/service/serviceContainer'
const TabPane = Tabs.TabPane;

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
                          <Tabs defaultActiveKey="1">
                            <TabPane tab="Corpo da Nota" key="1">
                                <InvoiceForm mode={this.props.mode} 
                                onSave={this.props.invoiceSave} 
                                invoice={this.props.invoice} 
                                loading={this.props.loading}/>
                            </TabPane>
                            <TabPane tab="Serviços" key="2">
                              <ServiceContainer mode={this.props.mode} 
                                onSave={this.props.invoiceSave} 
                                invoice={this.props.invoice} 
                                loading={this.props.loading}/>
                            </TabPane>
                            <TabPane tab="Impostos" key="3">
                            </TabPane>
                          </Tabs>
            </JlDrawer>
        </div>
      )
    }
}