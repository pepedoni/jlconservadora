import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import request from '../../api/request';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    margin: '-5px 0 0 8px'
    //left: 0,
    //right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 10000
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
  full: {
    width: 1000
  }
});

class AutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  state = {
    single: '',
    popper: '',
    suggestions: [],
  };

  renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  
    return (
      <TextField
        className={classes.margin}
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              disabled: classes.disabled,
              notchedOutline: classes.notchedOutline,
          },
        }}
        id={this.props.id}
        {...this.props.extraProps}
        label={this.props.label}
        className={this.props.className}
        value={this.props.value}
        fullWidth
        disabled={this.props.disabled}
        margin={this.props.margin || "normal"}
        variant={this.props.variant || "outlined"}
        type={this.props.type}
        {...other}
    ></TextField>


    );
  }  

  onSuggestionsFetchRequested = ({ value }) => {
    let url = this.props.route;
    if(this.props.filters) {
      url+='?';

      this.props.filters.forEach(element => {
        url += element + '=' + value + '&';
      });
    }

    request.get(url)
      .then((response) =>  {
        let data = (response.data.data) ? response.data.data : response.data;
        this.setState({ suggestions: data })
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  getSuggestionValue(suggestion) {
    return suggestion[this.props.valueField];
  }
  
  
  renderSuggestion(suggestion, { query, isHighlighted }) {
    let suggestionText = '';
    if(this.props.displayedFields && this.props.displayedFields.length > 0) {
        this.props.displayedFields.forEach((field) => {
          suggestionText += suggestion[field] + ' | ';
        });
        suggestionText = suggestionText.substring(0,(suggestionText.length - 2));
    }
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {suggestionText}
        </div>
      </MenuItem>
    );
  }


  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: (this.props.suggestions) ? this.props.suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.props.onSuggestionsFetchRequested ? this.props.onSuggestionsFetchRequested : this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      onSuggestionSelected: (this.props.onSuggestionSelected) ? this.props.onSuggestionSelected(this.props.outData) : function() {},
    };

    return (
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            value: this.props.value,
            onChange: this.props.onChange,
          }}
          fullWidth
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
            input: classes.input
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
    );
  }
}

export default withStyles(styles)(AutoComplete);