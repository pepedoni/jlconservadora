import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import black from '@material-ui/core/colors/black';



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


class JlInput extends Component {

   
    constructor(props) {
        super(props);
    }

    renderInput() {

        const { classes } = this.props;

        if(this.props.fullWidth) {
            return (
            <TextField
                    className={classes.margin}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            disabled: classes.disabled,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                    id={this.props.id}
                    label={this.props.label}
                    className={this.props.className}
                    disabled={this.props.disabled}
                    value={this.props.value}
                    fullWidth
                    onChange={this.props.onChange}
                    margin={this.props.margin || "normal"}
                    variant={this.props.variant || "outlined"}
                />
            );
        }
        else {
            return (<TextField
                    className={classes.margin}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            disabled: classes.disabled,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                    id={this.props.id}
                    label={this.props.label}
                    className={this.props.className}
                    disabled={this.props.disabled}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    margin={this.props.margin || "normal"}
                    variant={this.props.variant || "outlined"}
                />
            );
        }
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

export default withStyles(styles)(JlInput);

