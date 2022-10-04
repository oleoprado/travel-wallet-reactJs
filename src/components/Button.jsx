import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, onClick, moreClasses, disabled, id, datatestid } = this.props;
    return (
      <button
        className={ `button ${moreClasses}` }
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        id={ id }
        data-testid={ datatestid }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  moreClasses: PropTypes.string,
  id: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  datatestid: PropTypes.string,
};

Button.defaultProps = {
  // onClick: () => {},
  moreClasses: '',
  id: 0,
  datatestid: '',
};

export default Button;
