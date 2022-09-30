import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const {
      label,
      name,
      onChange,
      value,
      // defaultOption,
      options,
      datatestid,
    } = this.props;

    return (
      <label htmlFor={ name } className="label">
        { label }
        <div className="select">
          <select
            name={ name }
            id={ name }
            required
            onChange={ onChange }
            value={ value }
            data-testid={ datatestid }
          >
            {/* <option>{ defaultOption }</option> */}
            {
              options?.map((option, index) => ( // ? "pergunta" se o array existe, se existir executa o map
                <option key={ index }>{ option }</option>
              ))
            }
          </select>
        </div>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  // defaultOption: PropTypes.string.isRequired,
};

export default Select;
