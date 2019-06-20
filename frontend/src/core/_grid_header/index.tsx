import React, { Component } from 'react'
import { Button, Input } from "antd"

import './style.less';

export default class GridHeader extends Component {

    renderButton(button) {
        if(button.visible !== false) {
            return (
                <Button
                    icon={button.icon}
                    placeholder={button.placeholder}
                    onClick={button.onClick}
                    type={button.type}
                >
                    {button.text}
                </Button>
            );
        }

    }

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
                    {
                        this.props.otherButtons.map((button) => this.renderButton(button))
                    }
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