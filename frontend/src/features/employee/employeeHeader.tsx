import React, { Component } from 'react'

import GridHeader from 'core/_grid_header/'

export default class Header extends Component {
  render() {
    return (
      <GridHeader 
        onAdd={ this.props.onAdd } 
        addLabel="Adicionar Colaborador" 
      />  
    );
  }
};