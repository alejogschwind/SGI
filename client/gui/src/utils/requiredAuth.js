import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addFlashMessage } from '../actions/flashMessages'
import { authCheckState } from '../actions/authActions'

export default function(ComposedComponent) {
  class requiredAuth extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render (){
      return (
        <>
          { !this.props.loading && 
            <>{this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : <Redirect to="/login/"/>}</>
          }
        </>
        );
    }
  }

  requiredAuth.propsTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      loading: state.auth.loading
    }
  }

  

  return connect(mapStateToProps, { addFlashMessage })(requiredAuth);
}
