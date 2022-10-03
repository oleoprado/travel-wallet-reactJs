import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

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
    console.log(valor.type);
    expect(valor).toBeInTheDocument();
  });

  // it('se o path está correto "/carteira"', () => {
  //   const { history } = renderWithRouterAndRedux(<Wallet />, ['/', '/carteira']);

  //   expect(history.location.pathname).toBe('/carteira');
  // });
});
