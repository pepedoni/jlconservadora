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
        title: 'Valor', 
        dataIndex: 'value',
        align: 'right'
    }   
];

const url = '/taxes';

export default class TaxesGrid extends Component {
    render() {
        return (
            <Grid onAdd={this.props.onAdd} 
                addLabel={""} 
                columns={columns} 
                url= {(this.props.url) ? this.props.url : url} 
                rowKey="id"
                onRowClick={ this.props.onRowClick }
                filters={(this.props.filters) ? this.props.filters : []}
                renderAdd={ false }
            />
        )
    }
}