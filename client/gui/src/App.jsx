import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import * as actions from './actions/authActions'
import Routes from './routes'

import { authCheckState } from './actions/authActions';
import { addFlashMessage } from './actions/flashMessages';

class App extends React.Component {
  
  componentDidMount() {
    // console.log('Bas')
    // this.props.onTryAutoSignin()
  }

  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(authCheckState()),
    addFlashMessage
  }
}
export default connect(null, mapDispatchToProps)(App);
