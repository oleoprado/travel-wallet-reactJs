// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  ADD_EXPENSES,
  DELETE_EXPENSE,
  GET_COTACAO,
  GET_CURRENCIES,
  REQUEST_API } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.payload),
    };
  case GET_COTACAO:
    return {
      ...state,
      exchangeRates: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
