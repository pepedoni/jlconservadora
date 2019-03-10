import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
    typography: { useNextVariants: true },
});


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    cssLabel: {
      '&$cssFocused': {
        color: blue[400],
      },
    },
    disabled: {
        borderColor: '#000',
        borderBottomColor: '#000',
        color: '#595959'
    },
    cssFocused: {
        fontSize: 14
    },
    cssUnderline: {
      '&:after': {
        borderBottomColor: blue[400],
      },
    },
    cssOutlinedInput: {
        color: '#000',
        fontSize: 14,
      '&$cssFocused $notchedOutline': {
        borderColor: blue[400],
      },
    },
    notchedOutline: {
        fontSize: 14
    },
    bootstrapRoot: {
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
  
});


class JlSelect extends Component {

   
    constructor(props) {
        super(props);

        this.renderOption = this.renderOption.bind(this);
    }

    renderOption(item) {
        return (
            <MenuItem key={item.key} value={item.key}>
                {item.label}
            </MenuItem>
        );
    }

    renderInput() {

        const { classes } = this.props;
      
        return (
            <TextField
                id="outlined-select-currency"
                select
                label={this.props.label}
                className={this.props.className}
                value={this.props.value}
                onChange={(e) => this.props.onSelect(e, this.props.name)}
                fullWidth
                disabled={this.props.disabled}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    },
                }}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        disabled: classes.disabled,
                        notchedOutline: classes.notchedOutline,
                    },
                }}
                margin="normal"
                variant="outlined"
                >
                    {this.props.dataSource.map((item) => this.renderOption(item))}

            </TextField>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                { this.renderInput() }
            </div>
        );
    }
} 

export default withStyles(styles)(JlSelect);

