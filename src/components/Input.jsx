import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, datatestid } = this.props;
    return (
      <label className="label" htmlFor={ name }>
        { label }
        <div className="control">
          <input
            className="input"
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            id={ name }
            data-testid={ datatestid }
          />
        </div>
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  datatestid: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
};

export default Input;
