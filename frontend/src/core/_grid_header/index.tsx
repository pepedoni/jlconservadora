import React, { Component } from 'react'
import { Button, Input } from "antd"

import './style.less';

export default class GridHeader extends Component {
    render() {
        return (
            <div className="grid-header">
                <div className="inline-filter">
                    <Input.Search
                        placeholder="Pesquisar"
                        onSearch={value => this.props.onFilter(value)}
                    />
                </div>
                <div className="buttons">
                    <Button 
                        icon="filter"
                        onClick={this.props.onClickFilter}
                    >
                        Filtros
                    </Button>
                    <Button 
                        type="primary" 
                        icon="solution"
                        onClick={this.props.onAdd}
                    >
                        { this.props.addLabel }
                    </Button>
                    <Button 
                        icon="reload"
                        onClick={this.props.onReload}
                    />
                </div>
            </div>
        )
    }
} 