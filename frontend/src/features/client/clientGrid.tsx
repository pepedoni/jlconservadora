import React, { Component } from 'react'

import Grid from 'core/_grid'
import ClientFilter from './clientFilter'

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        // sorter: true,
        // render: name => `${name.first} ${name.last}`,
        // width: '50%',
    },
    {
        title: 'Endereco',
        dataIndex: 'complete_address',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        // sorter: true,
        // width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'syndic_email',
    }   
];

const url = '/clients';

export default class ClientGrid extends Component {
    render() {
        return (
            <div>
                <Grid onAdd={this.props.onAdd} 
                    addLabel={"Cliente"} 
                    columns={columns} 
                    url= {url} 
                    rowKey="id"
                    onRowClick={ this.props.onRowClick }
                    openFilter={this.props.openFilter}
                    filter={this.props.filter}
                />

                <ClientFilter visible={this.props.filterOpen} clientCloseFilter={this.props.clientCloseFilter}
                    clientOnFilter={this.props.clientOnFilter} clientFindDistricts={this.props.clientFindDistricts}
                    clientDistricts={this.props.districts}/>
            </div>
        )
    }
}