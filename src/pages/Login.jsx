import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/login.css';
import logo from '../styles/images/logo.png';

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
    localStorage.setItem('email', email);
    history.push('/carteira');
  };

  render() {
    document.title = 'Home - Trybe Wallet';
    const { email, password, isBtnDisabled } = this.state;
    return (
      <div className="page__login">
        <div className="container__login">
          <img src={ logo } alt="logo trybeWallet" className="logo" />
          <form className="form__login">
            <Input
              // label="Email"
              placeholder="Email"
              type="email"
              onChange={ this.handleChange }
              value={ email }
              name="email"
              datatestid="email-input"
              className="input__login"
            />
            <Input
              // label="Senha"
              placeholder="Senha"
              type="password"
              onChange={ this.handleChange }
              value={ password }
              name="password"
              datatestid="password-input"
              className="input__login"
            />
            <Button
              type="button"
              label="Entrar"
              disabled={ isBtnDisabled }
              onClick={ this.handleBtn }
              moreClasses="btn__login"
            />

          </form>
        </div>
      </div>
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
