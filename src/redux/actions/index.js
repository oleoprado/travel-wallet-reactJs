// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const GET_COTACAO = 'GET_COTACAO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
const ECONOMIA_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export const getEmail = (payload) => ({ type: SAVE_EMAIL, payload });

export const requestApi = () => ({ type: REQUEST_API });

export const getCotacaoMomento = (payload) => ({ type: GET_COTACAO, payload });

export const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const addExpenses = (payload) => ({ type: ADD_EXPENSES, payload });

export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

export const getCurrenciesFail = () => ({ type: GET_CURRENCIES_FAIL });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requestApi());
      const response = await fetch(ECONOMIA_BASE_API);
      const data = await response.json();
      delete (data.USDT);

      const currencies = Object.keys(data);

      dispatch(getCurrencies(currencies));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchExchangeRates() {
  return async (dispatch) => {
    try {
      dispatch(requestApi());
      const response = await fetch(ECONOMIA_BASE_API);
      const data = await response.json();

      delete (data.USDT);
      console.log(data);
      dispatch(getCotacaoMomento(data));
    } catch (err) {
      console.log(err);
    }
  };
}
