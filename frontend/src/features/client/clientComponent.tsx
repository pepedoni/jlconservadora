import React, { Component } from 'react'
import ClientGrid from './clientGrid'
import ClientForm from './clientForm'
import JlDrawer from "core/_drawer/"
import AddButton from "core/_fab/index"
import './styles.less';

export default class ClientComponent extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="component">
            <ClientGrid onRowClick= {this.props.onRowClick} />
            <JlDrawer isVisible={this.props.formOpen} 
                        onClose={this.props.clientCloseForm} 
                        onEdit={this.props.clientEdit} 
                        onDelete={this.props.clientDelete} 
                        mode={this.props.mode}
                        title="Adicionar Cliente">
                <ClientForm mode={this.props.mode} onSave={this.props.clientSave} client={this.props.client}/>
            </JlDrawer>
            <AddButton onClick={this.props.clientAdd} />
        </div>
      )
    }
}