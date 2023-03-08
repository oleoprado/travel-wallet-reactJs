import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import '../styles/wallet.css';
import {
  addExpenses,
  fetchCurrencies,
  fetchExchangeRates,
  updateExpense } from '../redux/actions';

const PAGAMENTO_LIST = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS_LIST = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(_prevProps, prevState) {
    const { expenses, idToEdit, editor } = this.props;

    const expense = expenses.find((e) => e.id === idToEdit);
    const currentStateXprevState = (
      JSON.stringify(this.state) === JSON.stringify(prevState)
    );
    const verifyIfEdit = expense && editor;

    if (verifyIfEdit && currentStateXprevState) {
      this.setState({ ...expense });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleBtn = async () => {
    const { dispatch, editor } = this.props;
    if (editor) {
      dispatch(updateExpense(this.state));
    } else {
      await dispatch(fetchExchangeRates());

      this.setState((preventState) => ({
        id: preventState.id + 1,
      }));

      const { exchangeRates } = this.props;

      dispatch(addExpenses({ ...this.state, exchangeRates }));
    }
    this.setState({ value: '', description: '' });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies, editor } = this.props;
    return (
      <div className="container__form">
        <form className={ editor ? 'form_editor' : 'form_expenses' }>
          <Input
            label="Descrição da despesa"
            type="text"
            onChange={ this.handleChange }
            value={ description }
            name="description"
            datatestid="description-input"
            className="input__description"
          />
          <Select
            label="Categoria da despesa"
            defaultOption="Selecione"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
            options={ TAGS_LIST }
            datatestid="tag-input"
            className="tag__select"
          />
          <Input
            label="Valor"
            type="number"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            datatestid="value-input"
            className="value__input"
          />
          <Select
            label="Método de pagamento"
            defaultOption="Selecione"
            onChange={ this.handleChange }
            value={ method }
            name="method"
            options={ PAGAMENTO_LIST }
            datatestid="method-input"
            className="method__select"
          />
          <Select
            label="Moeda"
            defaultOption="Selecione"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            options={ currencies }
            datatestid="currency-input"
            className="currency__select"
            required
          />
        </form>
        <div className="container__btn">
          <Button
            label={ editor ? 'Salvar edição' : 'Adicionar despesa' }
            onClick={ this.handleBtn }
            disabled={ false }
            moreClasses={ editor ? 'btn__add__editor' : 'btn__add__expense' }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.shape({
    USD: PropTypes.string,
  }),
  expenses: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })).isRequired,
  idToEdit: PropTypes.number,
  editor: PropTypes.bool.isRequired,
};

WalletForm.defaultProps = {
  exchangeRates: {
    USD: '',
  },
  idToEdit: null,
};

export default connect(mapStateToProps)(WalletForm);
