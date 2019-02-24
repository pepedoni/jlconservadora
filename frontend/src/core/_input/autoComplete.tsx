import React, {Component} from 'react';
import JlInput from './input';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    AutoComplete,
} from 'antd';
import { CLIENT_SAVE_SUCCESS } from '../../features/client/constants';

const Option = AutoComplete.Option;

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
});

class JlAutoComplete extends Component {

    constructor(props) {

        super(props);

        this.getTextItem = this.getTextItem.bind(this);
        this.renderOption = this.renderOption.bind(this);
    
    }

    renderOption(item) {
        return (
            <Option key={item.key} text={item.description} >
                {this.getTextItem(item)}
            </Option>
        );
    }

    getOutData(outData, item) {
        return outData.map((field) => {
            return item[field];
        });
    }

    getTextItem(item) {
        return this.props.displayedfields.map((field) => {
            return item[field] + ' | ';
        }); 
    }

    render() {

        const { classes } = this.props;

        return ( 
            <AutoComplete
                  className={classes.textField}
                  size={this.props.size}
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  dataSource={this.props.dataSource.map(this.renderOption)}
                  onSelect={this.props.onSelect}
                  onSearch={this.props.handleSearch}
                  value={this.props.value}
                  optionLabelProp="text"
                >
                    <JlInput
                        label={this.props.label}
                        value={this.props.value}
                        disabled={this.props.disabled}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
            </AutoComplete>
        );
    }
}

export default withStyles(styles)(JlAutoComplete);