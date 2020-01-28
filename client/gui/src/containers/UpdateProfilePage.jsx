import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepsUpdateProfile from '../components/StepsUpdateProfile';
import Header from '../components/Header';

class UpdateProfilePage extends Component {
  render() {
    return (
      <>
        <Header />
        <StepsUpdateProfile />
      </>
    );
  }
}

UpdateProfilePage.propTypes = {

};

export default UpdateProfilePage;