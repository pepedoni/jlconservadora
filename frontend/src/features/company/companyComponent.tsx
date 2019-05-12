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
            <CompanyGrid onAdd={this.props.companyAdd} filter={this.props.filter} onRowClick= {this.props.onRowClick} />
            <JlDrawer   addLabel={"Empresa"}
                        isVisible={this.props.formOpen} 
                        onClose={this.props.companyCloseForm} 
                        mode={this.props.mode}
                        title="Empresa">
                <CompanyForm 
                        mode={this.props.mode} 
                        onSave={this.props.companySave} 
                        onEdit={this.props.companyEdit} 
                        onDelete={this.props.onDelete} 
                        company={this.props.company}
                        loading={this.props.loading}
                        callLoading={this.props.callLoading}/>
            </JlDrawer>
        </div>
      )
    }
}