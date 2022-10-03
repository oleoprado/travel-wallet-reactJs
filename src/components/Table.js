import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(({
              description, tag, method, value, currency, exchangeRates, id,
            }) => {
              const moedaConversao = 'Real';
              const moedaUtilizado = exchangeRates[currency].name;
              // const cotacaoAtual = Math.round((+exchangeRates[currency].ask) * 100) / 100;
              const cotacaoAtual = (+exchangeRates[currency].ask);
              const valorConvertido = +(value * cotacaoAtual);

              return (

                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method}</td>
                  <td>{ (+value).toFixed(2) }</td>
                  <td>{ moedaUtilizado }</td>
                  <td>{ cotacaoAtual.toFixed(2) }</td>
                  <td>{ valorConvertido.toFixed(2) }</td>
                  <td>{ moedaConversao }</td>
                  <td>
                    <Button
                      type="button"
                      label="Editar"
                      // onClick={ }
                      disabled={ false }
                    />
                    <Button
                      type="button"
                      label="Excluir"
                      // onClick={ }
                      disabled={ false }
                    />
                  </td>
                </tr>

              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Table);
