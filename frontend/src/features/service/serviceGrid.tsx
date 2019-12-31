import React, { Component } from 'react'

import Grid from 'core/_grid'

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        width: '35%'
    },
    {
        title: "Código de Tributação",
        dataIndex: 'taxation_code',
        // sorter: true,
        width: '35%'
    },
    {
        title: 'Item da Lista',
        dataIndex: 'list_item',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        // sorter: true,
        width: '20%'
    },
    {
        title: 'Aliquota',
        dataIndex: 'aliquot',
        width: '10%'
    }   
];

const url = '/services';

export default class ServiceGrid extends Component {
    render() {
        return (
            <Grid onAdd={this.props.onAdd} 
                addLabel={"Serviço"} 
                columns={columns} 
                url= {(this.props.url) ? this.props.url : url} 
                rowKey="id"
                onRowClick={ this.props.onRowClick }
                filters={(this.props.filters ? this.props.filters : {})}
            />
        )
    }
}