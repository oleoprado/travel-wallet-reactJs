import {
  ADD_EXPENSES,
  DELETE_EXPENSE,
  GET_COTACAO,
  GET_CURRENCIES,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  REQUEST_API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: null,
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
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== state.idToEdit), action.payload]
        .sort((a, b) => a.id - b.id),
      idToEdit: null,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
