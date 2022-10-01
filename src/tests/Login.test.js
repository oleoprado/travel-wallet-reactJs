import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página de Login', () => {
  it('Verifica se a tela Login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Login />);

    const loginTitle = screen.getByRole('heading', { name: /login/i });
    const emailInput = screen.getByText(/email/i);
    const passwordInput = screen.getByText(/senha/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(loginTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Verifica se é a senha é maior que 5', () => {
    renderWithRouterAndRedux(<Login />);

    const passwordInput = screen.getByText(/senha/i);

    userEvent.type(passwordInput, '123456');

    expect(passwordInput.lenght).not.toBe(5);
  });

  it('Verifica se o input email tem um @', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByText(/email/i);
    userEvent.type(emailInput, 'teste@gmail.com');

    expect(emailInput).toBeInTheDocument('@');
  });

  it('Verifica se apos preenchimento do email e senha e "entra", redireciona p/ carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByText(/email/i);
    const passwordInput = screen.getByText(/senha/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '123456');

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
