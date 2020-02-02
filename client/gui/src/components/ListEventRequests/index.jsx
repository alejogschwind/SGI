import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getEventIscriptionsAsRDR } from '../../actions/inscriptionsActions';

import { Menu, Empty, PageHeader, Button, Dropdown, Icon } from 'antd';

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
      tab: 'all',
      inscriptions: [],
    }

    this.getData = this.getData.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
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

  handleMenuClick(e) {
    this.setState({tab: e.key})
  }

  render() {
    const { SubMenu } = Menu;
    const { tab, inscriptions } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="all">
          {/* <Icon type="user" /> */}
          Todas
        </Menu.Item>
        <Menu.Item key="approve">
          {/* <Icon type="user" /> */}
          Aprobadas
        </Menu.Item>
        <Menu.Item key="pending">
          {/* <Icon type="user" /> */}
          Pendientes
        </Menu.Item>
        <Menu.Item key="deny">
          {/* <Icon type="user" /> */}
          Rechazadas
        </Menu.Item>
      </Menu>
    );

    const inscriptionsFitered = inscriptions.filter(filterStatus(tab));
    return (
      <>
        <PageHeader
            style={{
              border: '1px solid rgb(235, 237, 240)',
            }}
            onBack={() => window.history.back()}
            title="Solicitudes"
        />

        <div className="ListEventRequest__filter_wrp">
          <Dropdown className="ListEventRequest__dropdown" trigger="click" overlay={menu}>
            <Button size="large">
              Estado <Icon type="down" />
            </Button>
          </Dropdown>
        </div>

        <section className="ListEventRequests__wrp">
          { inscriptionsFitered.length != 0 ?
            inscriptionsFitered.map((i) => (
              <RequestCard
                key={i.pk}
                loanding={this.props.loanding}
                inscription={i}
                getData={this.getData}
              />
            ))
            :
            <div className="ListEventRequest_msg">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay solicitudes con estas caracteristicas."
              />
            </div>
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
