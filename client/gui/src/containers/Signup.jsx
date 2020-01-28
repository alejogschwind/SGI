import React from 'react';
import SignupForm from '../components/SignupForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { authSignup } from '../actions/authActions';
import { addFlashMessage, deleteAllFlashMessage } from '../actions/flashMessages';
import FlashMessagesList from '../components/FlashMessagesList';
import '../assets/statics/containers/Signup.css'

class Signup extends React.Component {
  
  render() {
    const { authSignup, addFlashMessage, deleteAllFlashMessage } = this.props;
    return (
      <>
        <FlashMessagesList />
        <section className="Signup__form_wrapper">
          <SignupForm 
            authSignup={authSignup}
            history={this.props.history}
            addFlashMessage={addFlashMessage}
            deleteAllFlashMessage={deleteAllFlashMessage}
          />
        </section>
      </>
    )
  }
}

Signup.propTypes = {
  authSignup: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteAllFlashMessage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  authSignup,
  addFlashMessage,
  deleteAllFlashMessage
}

export default connect(null,mapDispatchToProps)(Signup);