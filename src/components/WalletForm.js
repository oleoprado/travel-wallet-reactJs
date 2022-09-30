import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';
import Input from './Input';
import Select from './Select';

const PAGAMENTO_LIST = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS_LIST = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    valor: '',
    descricao: '',
    moeda: '',
    metodoPagamento: '',
    tag: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    // this.chamaGetCurrencies();
    await dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      valor,
      descricao,
      moeda,
      metodoPagamento,
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
          value={ valor }
          name="valor"
          datatestid="value-input"
        />
        <Input
          label="Descrição: "
          type="text"
          onChange={ this.handleChange }
          value={ descricao }
          name="descricao"
          datatestid="description-input"
        />
        <Select
          label="Moeda: "
          // defaultOption="Selecione"
          onChange={ this.handleChange }
          value={ moeda }
          name="moeda"
          options={ currencies }
          datatestid="currency-input"
        />
        <Select
          label="Método de pagamento: "
          // defaultOption="Selecione"
          onChange={ this.handleChange }
          value={ metodoPagamento }
          name="metodoPagamento"
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
