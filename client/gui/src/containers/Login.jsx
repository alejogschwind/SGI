import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { authLogin, logout } from '../actions/authActions'
import { addFlashMessage, deleteAllFlashMessage } from '../actions/flashMessages'

import FlashMessagesList from '../components/FlashMessagesList';
import LoginForm from '../components/LoginForm'
import '../assets/statics/containers/Login.css'

class Login extends React.Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { authLogin, addFlashMessage, deleteAllFlashMessage } = this.props;
    return (
      <>
        <FlashMessagesList />
        <section className="login__form-wrapper">
          <LoginForm 
            history={this.props.history}
            authLogin={authLogin}
            addFlashMessage={addFlashMessage}
            deleteAllFlashMessage={deleteAllFlashMessage}
          />
        </section>
      </>
    );
  }
}

Login.propTypes = {
  authLogin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteAllFlashMessage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  authLogin,
  logout,
  addFlashMessage,
  deleteAllFlashMessage
}

export default connect(null, mapDispatchToProps)(Login);