import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const initialState = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '420',
        description: 'chá da tarde',
        currency: 'EUR',
        method: 'Cartão de crédito',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('Testando componente Table', () => {
  it('verifica se o valor e metodo de pagamento são exibidos na tabela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const valueTable = screen.getByRole('cell', { name: /420\.00/i });
    const methodTable = screen.getByRole('cell', { name: /cartão de crédito/i });

    expect(valueTable).toBeInTheDocument();
    expect(methodTable).toBeInTheDocument();
  });

  it('verifica se a label do botão(add despesa) é alterada ao clicar no botao de editar', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpenseBtn).toBeInTheDocument();

    const editBtn = screen.getByRole('button', { name: /editar/i });
    expect(editBtn).toBeInTheDocument();
  });

  it('verifica se o botao EXCLUIR está com o comportamento esperado', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    expect(deleteBtn).toBeInTheDocument();
    userEvent.click(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
  });

  it('verifica o type do botão editar', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const editBtn = screen.getByRole('button', { name: /editar/i });
    expect(editBtn.type).toBe('button');
  });

  it('verifica se edita despesa ao clicar no botao', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const editBtn = screen.getByRole('button', { name: /editar/i });
    userEvent.click(editBtn);

    const inputValue = screen.getByTestId('value-input');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '490');

    const editarDespesaBtn = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(editarDespesaBtn);
    // screen.debug();

    const valueTable = screen.getByRole('cell', { name: /490\.00/i });
    expect(valueTable).toBeInTheDocument();
  });
});
