import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, onClick, type, moreClasses, disabled, id, datatestid } = this.props;
    return (
      <button
        className={ `button ${moreClasses}` }
        type={ type ? 'button' : 'submit' }
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
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  moreClasses: PropTypes.string,
  id: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  datatestid: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  moreClasses: '',
  id: 0,
  datatestid: '',
};

export default Button;
