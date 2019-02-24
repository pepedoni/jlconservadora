import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

import InputMask from 'react-input-mask';


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

          return (
            <InputMask 
              value={this.props.value} 
              mask={this.props.mask} 
              onChange={this.props.onChange}
              disabled={this.props.disabled}
              fullWidth
              type={this.props.type}
              >
              {() => <TextField
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
                      value={this.props.value}
                      fullWidth
                      onChange={this.props.onChange}
                      disabled={this.props.disabled}
                      margin={this.props.margin || "normal"}
                      variant={this.props.variant || "outlined"}
                      type={this.props.type}
                      rows={this.props.rows}
                  ></TextField>
                }
                </InputMask>
            );
        
    }

    renderFieldMask(value, mask) {
      if(mask) {
        return (
          <InputMask value={value} mask={mask} />
        )
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

