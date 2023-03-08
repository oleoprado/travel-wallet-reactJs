import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
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

  it('verifica se é feito 2 chamadas para Api após clicar no btn adicionar despesa', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    await waitFor(() => userEvent.click(btnAdd));

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
