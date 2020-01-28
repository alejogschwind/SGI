import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuBtn from './MenuBtn';
import ResponsiveMenu from './ResponsiveMenu'

import logo from './statics/img/airaup_logo.png';
import './statics/css/styles.css';

class Header extends Component {
  render() {
    return (
      <header className="Header_wrp">
        <div className="Logo_wrp">
          <img src={logo} alt="Logo AIRAUP" width="50" height="50"/>
        </div>
        {this.props.children}
      </header>
    );
  }
}

Header.propTypes = {

};

export default Header;