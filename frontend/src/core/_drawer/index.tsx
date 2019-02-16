import React, {Component} from 'react';
import { Drawer, Button } from "antd";
import './style.less';

export default class JlDrawer extends Component {

    constructor(props) {
        super(props);
    }

    renderButtons(mode) {
        if(mode == 'view') {
            return (<div className="center-actions">
                <Button shape="circle" type="primary" icon="edit" size="large" onClick={this.props.onEdit}></Button>
                <Button shape="circle" type="primary" icon="delete" size="large" onClick={this.props.onDelete}></Button>
            </div>);
        }
        else {
            return (<div className="center-actions">
                <Button shape="circle" type="primary" icon="check" onClick={this.props.onEdit}></Button>
            </div>);
        }
    }

    state = { visible: false };

    render() {
        return (
                <Drawer
                    title={this.props.title}
                    width={920}
                    onClose={this.props.onClose}
                    visible={this.props.isVisible}
                    style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                    }}
                >   
                    <div>
                        {this.props.children}
                        {this.renderButtons(this.props.mode)}
                    </div>
                </Drawer>
        );
    }
}