import React, { Component } from 'react'

import JlDrawer from "core/_drawer/"

import CompanyForm from './companyForm'
import CompanyGrid from './companyGrid'

export default class CompanyComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <CompanyGrid onAdd={this.props.companyAdd} onRowClick= {this.props.onRowClick} />
            <JlDrawer   addLabel={"Empresa"}
                        isVisible={this.props.formOpen} 
                        onClose={this.props.companyCloseForm} 
                        onEdit={this.props.companyEdit} 
                        onDelete={this.props.companyDelete} 
                        mode={this.props.mode}
                        title="Empresa">
                <CompanyForm 
                        mode={this.props.mode} 
                        onSave={this.props.companySave} 
                        company={this.props.company}
                        loading={this.props.loading}/>
            </JlDrawer>
        </div>
      )
    }
}