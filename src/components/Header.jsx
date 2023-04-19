import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import logo from '../styles/images/logo.png';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const sumExpenses = expenses
      .map(({ value, exchangeRates, currency }) => exchangeRates[currency].ask * value)
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
    const totalExpenses = sumExpenses.toFixed(2);

    return (
      <header>
        <div className="container__header">
          <img src={ logo } alt="logo" className="logo__header" />
          <div className="despesas__header">
            <div className="icon_expense_header">
              <FaMoneyCheckAlt size={ 25 } color="#3485FF" />
              <strong>Tota de despesas:</strong>
            </div>
            <div
              data-testid="total-field"
            >
              { totalExpenses }
            </div>
            <div
              data-testid="header-currency-field"
            >
              BRL
            </div>
          </div>
          <div
            data-testid="email-field"
            className="email_header"
          >
            <CgProfile size={ 25 } color="#2FC18C" />
            <strong>
              { email }
            </strong>
          </div>
        </div>
      </header>
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
