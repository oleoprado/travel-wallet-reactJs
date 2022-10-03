import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testando o componente Header', () => {
  it('Verifica se o header é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);

    const emailPessoa = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(emailPessoa).toBeInTheDocument();
  });
});
