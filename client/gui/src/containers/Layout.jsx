import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authCheckState } from '../actions/authActions'

import Header from '../components/Header'
import ResponsiveMenu from '../components/Header/ResponsiveMenu'

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: false,
      loading: true
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    // console.log('open')
    this.setState({menu: !this.state.menu})
  }

  render() {
    return (
      <div>
        { !this.props.loading &&
          <>
            <Header>
              <div className="Hamburger_menu" onClick={this.toggleMenu}>
                <svg width="20" height="20" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line y1="1" x2="20" y2="1" stroke="#505050" strokeWidth="2"/>
                  <line y1="16" x2="20" y2="16" stroke="#505050" strokeWidth="2"/>
                  <line y1="8" x2="20" y2="8" stroke="#505050" strokeWidth="2"/>
                </svg>
              </div>
              <ResponsiveMenu
                first_name={this.props.auth.user.personal.first_name ? this.props.auth.user.personal.first_name : null}
                last_name={this.props.auth.user.personal.last_name ? this.props.auth.user.personal.last_name : null}
                avatar={this.props.auth.user.profile.avatar ? this.props.auth.user.profile.avatar : null}
                open={this.state.menu}
                is_RDR={this.props.auth.user.type === 'RDR'}
                toggleMenu={this.toggleMenu}
              />
            </Header>
            <section className="Home_wrp">
              {this.props.children}
            </section>
          </>
        }
      </div>
    );
  }
}

Layout.propTypes = {
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  authCheckState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    auth: state.auth
  }
}

export default connect(mapStateToProps,{ authCheckState })(Layout);

