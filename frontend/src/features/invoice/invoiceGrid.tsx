import React, { Component } from 'react'

import Grid from 'core/_grid'
import InvoiceFilter from './invoiceFilter'

const columns = [
    {
        title: 'Número',
        dataIndex: 'number',
        sorter: true,
        // render: name => `${name.first} ${name.last}`,
        width: '10%',
    },
    {
        title: 'Destinatário',
        dataIndex: 'client_name',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        sorter: true,
        width: '40%',
    },
    {
        title: 'Data',
        sorter: true,
        dataIndex: 'provision_date_grid',
        width: '25%'
    }, 
    {
        title: 'Valor',
        sorter: true,
        width: '25%',
        dataIndex: 'value',
        align: 'right'
    }   
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

const url = '/invoice';

export default class InvoiceGrid extends Component {
    render() {
        return (
            <div>
                <Grid onAdd={this.props.onAdd} 
                    addLabel={"Nota Fiscal"} 
                    columns={columns} 
                    url= {url} 
                    rowKey="id"
                    filter={this.props.filter}
                    onRowClick={ this.props.onRowClick }
                    openFilter={this.props.openFilter}
                    otherProps={{rowSelection: rowSelection}}
                    rowSelection={rowSelection}
                />

                <InvoiceFilter visible={this.props.filterOpen} invoiceCloseFilter={this.props.invoiceCloseFilter}
                    invoiceOnFilter={this.props.invoiceOnFilter} filter={this.props.filter}/>
            </div>
        )
    }
}