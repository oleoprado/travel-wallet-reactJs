import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const sumExpenses = expenses
      .map(({ value, exchangeRates, currency }) => exchangeRates[currency].ask * value)
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
    const totalExpenses = sumExpenses.toFixed(2);

    return (
      <div>
        <span
          data-testid="email-field"
        >
          { email }
        </span>
        <span
          data-testid="total-field"
        >
          { totalExpenses }
        </span>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  // ...state.user, ...state.wallet,
});

export default connect(mapStateToProps, null)(Header);
