import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type,
      name,
      className,
      label,
      onChange,
      value,
      datatestid,
      placeholder } = this.props;

    return (
      <label className={ `label label_${name}` } htmlFor={ name }>
        { label }
        <div className="control">
          <input
            className={ className }
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            id={ name }
            data-testid={ datatestid }
            placeholder={ placeholder }
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
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
  placeholder: '',
  className: '',
};

export default Input;
