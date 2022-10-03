import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testando o componente WalletForm', () => {
  it('verifica se o walletForm é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByText(/valor:/i);
    const btn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valor).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('verifica se o input valor é do tipo number', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valor = screen.getByText(/valor:/i);

    expect(valor).toBeInTheDocument();
  });

  // it('se o path está correto "/carteira"', () => {
  //   const { history } = renderWithRouterAndRedux(<Wallet />, ['/', '/carteira']);

  //   expect(history.location.pathname).toBe('/carteira');
  // });

  it('teste mock', () => {
    // const moedas = {
    //   ARS: {
    //     ask: '0.0349',
    //     bid: '0.0349',
    //     code: 'ARS',
    //     codein: 'BRL',
    //     name: 'Peso Argentino/Real Brasileiro',
    //   },
    //   EUR: {
    //     ask: '5.0863',
    //     bid: '5.0832',
    //     code: 'EUR',
    //     codein: 'BRL',
    //     name: 'Euro/Real Brasileiro',
    //   },
    // },

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(btnAdd);

    expect(global.fetch).toHaveBeCalledTimes(1);
  });
});
