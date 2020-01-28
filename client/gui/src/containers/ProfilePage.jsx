import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Profile from '../components/Profile'
import Layout from './Layout'

import API from '../api';

class ProfilePage extends Component {
  // TODO: Buscar una mejor solución.
  // componentDidMount() {
  //   this.setState({user: this.props.auth.user})
  // }
  
  // componentWillReceiveProps(){
  //   this.setState({user: this.props.auth.user})
  // }

  render() {
    // this.setState({user: this.props.auth.user})
    console.log(this.props)
    return (
      <>
        { !this.props.loading &&
          <Layout>
            <Profile 
              profile={this.props.auth.user.profile ? this.props.auth.user.profile : null }
              first_name={this.props.auth.user.personal.first_name ? this.props.auth.user.personal.first_name : null}
              last_name={this.props.auth.user.personal.last_name ? this.props.auth.user.personal.last_name : null}
            />
          </Layout>
        }
      </>
    );
  }
}


ProfilePage.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(ProfilePage)