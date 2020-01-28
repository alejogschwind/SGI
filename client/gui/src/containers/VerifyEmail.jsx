import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { userVerifyEmailConfirm } from '../actions/authActions'

import VerifyEmailForm from '../components/VerifyEmailForm'
// import '../assets/statics/containers/Login.css'

class VerifyEmail extends React.Component {
  render() {
    const { userVerifyEmailConfirm } = this.props;
    return (
      <section className="VerifyEmail__form-wrapper">
        <VerifyEmailForm 
          history={this.props.history}
          userVerifyEmailConfirm={userVerifyEmailConfirm}
        />
      </section>
    );
  }
}

VerifyEmail.propTypes = {
  userVerifyEmailConfirm: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  userVerifyEmailConfirm,
}

export default connect(null, mapDispatchToProps)(VerifyEmail);