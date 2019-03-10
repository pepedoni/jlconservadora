import React, { Component } from 'react'

import Grid from 'core/_grid'

const columns = [
    {
        title: 'Inscrição',
        dataIndex: 'inscription',
        // sorter: true,
        // render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Razão Social',
        dataIndex: 'name',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        sorter: true,
        width: '60%',
    },
    {
        title: 'Inscrição Municipal',
        dataIndex: 'municipal_inscription',
        width: '20%'
    }   
];

const url = '/company';

export default class CompanyGrid extends Component {
    render() {
        return (
            <Grid onAdd={this.props.onAdd} 
                addLabel={"Empresa"} 
                columns={columns} 
                url= {url} 
                rowKey="id"
                onRowClick={ this.props.onRowClick }
            />
        )
    }
}