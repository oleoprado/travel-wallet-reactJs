import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses, fetchCurrencies, fetchExchangeRates } from '../redux/actions';
import Input from './Input';
import Select from './Select';
import Button from './Button';

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleBtn = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchExchangeRates());

    this.setState((preventState) => ({
      id: preventState.id + 1,
    }));

    const { exchangeRates } = this.props;
    dispatch(addExpenses({ ...this.state, exchangeRates }));
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

    const { currencies } = this.props;
    return (
      <form>
        <div>WalletForm</div>
        <Input
          label="Valor: "
          type="number"
          onChange={ this.handleChange }
          value={ value }
          name="value"
          datatestid="value-input"
        />
        <Input
          label="Descrição: "
          type="text"
          onChange={ this.handleChange }
          value={ description }
          name="description"
          datatestid="description-input"
        />
        <Select
          label="Moeda: "
          // defaultOption="Selecione"
          onChange={ this.handleChange }
          value={ currency }
          name="currency"
          options={ currencies }
          datatestid="currency-input"
          required
        />
        <Select
          label="Método de pagamento: "
          // defaultOption="Selecione"
          onChange={ this.handleChange }
          value={ method }
          name="method"
          options={ PAGAMENTO_LIST }
          datatestid="method-input"
        />
        <Select
          label="Tag: "
          // defaultOption="Selecione"
          onChange={ this.handleChange }
          value={ tag }
          name="tag"
          options={ TAGS_LIST }
          datatestid="tag-input"
        />
        <Button
          type="button"
          label="Adicionar despesa"
          onClick={ this.handleBtn }
          disabled={ false }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
