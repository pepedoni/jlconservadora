import React, { Component } from 'react'

import Grid from 'core/_grid'
import InvoiceFilter from './invoiceFilter'

const columns = [
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
    },  
    {
        title: 'Número',
        dataIndex: 'number',
        sorter: true,
        // render: name => `${name.first} ${name.last}`,
        width: '10%',
    } 
];

const url = '/invoice';

export default class InvoiceGrid extends Component {

    constructor(props) {

        super(props);
    
        this.state = {
            selectedRows: [],
            otherButtons: []
        };

        this.state.otherButtons = [
            {
                icon: "arrow-up",
                text: 'Transmitir Notas',
                visible: false,
                onClick: () => this.props.transmitInvoice(this.state.selectedRows)
            }
        ];

    }

    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                
                let otherButtons = this.state.otherButtons;

                if(selectedRows.length > 0) {
                    otherButtons[0].visible = true;
                }
                else {
                    otherButtons[0].visible = false;
                }

                this.setState({...this.state, otherButtons: otherButtons, selectedRows});

            }
        };
    

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
                    otherButtons={this.state.otherButtons}
                />

                <InvoiceFilter visible={this.props.filterOpen} invoiceCloseFilter={this.props.invoiceCloseFilter}
                    invoiceOnFilter={this.props.invoiceOnFilter} filter={this.props.filter}/>
            </div>
        )
    }
}