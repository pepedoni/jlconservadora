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
                <Button shape="circle" type="primary" icon="form" size="large" onClick={this.props.onEdit}></Button>
                <Button shape="circle" type="primary" icon="delete" size="large" onClick={this.props.onDelete}></Button>
            </div>);
        }
    }

    renderLoading(loading) {
        if(loading) {
            return 
        }
    }

    state = { visible: false };

    render() {
        return (
            <Drawer
                title={this.props.title}
                width={(window.innerWidth > 700) ? ((window.innerWidth * 70) / 100) : window.innerWidth}
                onClose={this.props.onClose}
                visible={this.props.isVisible}
                className="drawer"
                style={{
                overflow: 'auto',
                height: 'calc(100% - 108px)',
                paddingBottom: '108px',
                }}
            >   
                {this.props.children}
                {this.renderButtons(this.props.mode)}

            </Drawer>
        );
    }
}