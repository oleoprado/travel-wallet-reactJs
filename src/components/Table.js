import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteExpense, editExpense } from '../redux/actions';
import Button from './Button';
import '../styles/table.css';

class Table extends Component {
  deleteBtn = (despesa) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(despesa));
  };

  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div className="container__table">
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
              expenses.map((despesa) => {
                const { description,
                  tag,
                  method,
                  value,
                  currency,
                  exchangeRates,
                  id } = despesa;

                const moedaConversao = 'Real';
                const moedaUtilizado = exchangeRates[currency].name;
                const cotacaoAtual = (+exchangeRates[currency].ask);
                const valorConvertido = +(value * cotacaoAtual);

                return (

                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method}</td>
                    <td>{ Number((value)).toFixed(2) }</td>
                    <td>{ moedaUtilizado }</td>
                    <td>{ cotacaoAtual.toFixed(2) }</td>
                    <td>{ valorConvertido.toFixed(2) }</td>
                    <td>{ moedaConversao }</td>
                    <td>
                      <div className="container_btn_table">
                        <Button
                          label={ <FaEdit size={ 22 } color="#00b381" /> }
                          onClick={ () => dispatch(editExpense(id)) }
                          disabled={ false }
                          datatestid="edit-btn"
                          moreClasses="edit_btn"
                        />
                        <Button
                          id={ id }
                          label={ <FaTrash size={ 20 } color="#ff4934" /> }
                          onClick={ () => this.deleteBtn(despesa) }
                          disabled={ false }
                          datatestid="delete-btn"
                          moreClasses="delete_btn"
                        />
                      </div>
                    </td>
                  </tr>

                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};
//
export default connect(mapStateToProps)(Table);
