import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getEventIscriptionsAsRDR } from '../../actions/inscriptionsActions';

import { Menu } from 'antd';

import RequestCard from '../RequestCard';
import RequestFilter from './RequestFilter';
import './statics/css/styles.css'

function filterStatus(tab) {
  return function(inscription) {
    switch(tab) {
      case 'approve':
        return inscription.status == 'approved';
      case 'pending':
        return inscription.status == 'pending';
      case 'deny':
        return inscription.status == 'deny';
      default:
        return true;
    }
  }
}

class ListEventRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanding: true,
      tab: 'pending',
      inscriptions: [],
    }

    this.getData = this.getData.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  getData() {
    const { event } = this.props;
    this.props.getEventIscriptionsAsRDR(event)
      .then(
        (res) => {
          this.setState({
            loanding: false,
            inscriptions: res.data,
          })
          console.log(this.state)
        }
      )
  }

  componentDidMount() {
    this.getData();
  }

  handleTabChange(e) {
    this.setState({tab: e.key})
  }

  render() {
    const { SubMenu } = Menu;
    const { tab, inscriptions } = this.state;
    return (
      <>
        <div className="ListEventRequest_filter">
          <Menu mode="horizontal" defaultSelectedKeys={this.state.tab} className="RequestFilter_wrp">
            <SubMenu title="Estado">
              <Menu.Item key="all" onClick={this.handleTabChange}>Todas</Menu.Item>
              <Menu.Item key="approve" onClick={this.handleTabChange}>Aprobadas</Menu.Item>
              <Menu.Item key="pending" onClick={this.handleTabChange}>Pendientes</Menu.Item>
              <Menu.Item key="deny" onClick={this.handleTabChange}>Denegados</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <section className="ListEventRequests__wrp">
          { 
            inscriptions.filter(filterStatus(tab)).map((i) => (
              <RequestCard
                key={i.pk}
                loanding={this.props.loanding}
                inscription={i}
                getData={this.getData}
              />
            ))
          }
        </section>
      </>
    );
  }
}

ListEventRequests.propTypes = {
  
};

export default connect(null, {
  getEventIscriptionsAsRDR
})(ListEventRequests);
