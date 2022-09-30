// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';
const ECONOMIA_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export const getEmail = (payload) => ({ type: SAVE_EMAIL, payload });

export const requestApi = () => ({ type: REQUEST_API });

export const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const test = (payload) => ({ type: 'teste', payload });

export const getCurrenciesFail = () => ({ type: GET_CURRENCIES_FAIL });

export function fetchApi() {
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
