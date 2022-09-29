import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions';
import Button from '../components/Button';
import Input from '../components/Input';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.verifyBtn();
    });
  };

  verifyBtn = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const MIN_PASSWORD = 6;
    const verifyPassword = password.length >= MIN_PASSWORD;
    this.setState({ isBtnDisabled: !(verifyEmail && verifyPassword) });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <form>
        <h1>Login</h1>
        <Input
          label="Email"
          type="email"
          onChange={ this.handleChange }
          value={ email }
          name="email"
          datatestid="email-input"
        />
        <Input
          label="Senha"
          type="password"
          onChange={ this.handleChange }
          value={ password }
          name="password"
          datatestid="password-input"
        />
        <Button
          type="button"
          label="Entrar"
          disabled={ isBtnDisabled }
          onClick={ this.handleBtn }
        />

      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
