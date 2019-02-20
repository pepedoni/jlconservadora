import React, { Component } from 'react'
import { Popover, Icon, Button, Input } from "antd";

import './style.less';

export default class Header extends React.Component {
  render() {
    return (
      <div className="contacts-header">
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
            Adicionar Colaborador
          </Button>
          <Button 
              icon="reload"
              onClick={this.props.onReload}
          />
        </div>
      </div>
    );
  }
};