import React, { Component } from 'react'

import Grid from 'core/_grid'

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        // sorter: true,
        // render: name => `${name.first} ${name.last}`,
        // width: '50%',
    },
    {
        title: 'Item da Lista',
        dataIndex: 'list_item',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        // sorter: true,
        // width: '20%',
    },
    {
        title: 'Aliquota',
        dataIndex: 'aliquot',
    }   
];

const url = '/service';

export default class ServiceGrid extends Component {
    render() {
        return (
            <Grid onAdd={this.props.onAdd} 
                addLabel={"Serviço"} 
                columns={columns} 
                url= {url} 
                rowKey="id"
                onRowClick={ this.props.onRowClick }
            />
        )
    }
}