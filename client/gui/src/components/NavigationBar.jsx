import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/authActions';

// ANTD
import { Layout, Menu, Row, Col, Icon} from 'antd';
const {Header} = Layout;

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const userMenu = (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
       >
        <Menu.Item key="1"><a href="/" onClick={this.logout}>Logout</a></Menu.Item>
      </Menu>
    )
    const guestMenu = (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/signup">Sign up</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
      </Menu>
    )
    return (
      <Header>
        <Row>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Link to="/" className="logo">Home</Link> 
          </Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>

          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            {isAuthenticated ? userMenu:guestMenu}
          </Col>
        </Row>
      </Header>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);