import React, { Component } from 'react';
import TaxesGrid from './TaxesGrid';

export default class TaxesComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <TaxesGrid filters={{invoice_id: this.props.invoice_id}} url="invoice/taxes"/>
        </div>
      )
    }
}