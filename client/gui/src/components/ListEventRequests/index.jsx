import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getEventIscriptionsAsRDR } from '../../actions/inscriptionsActions';

import { Menu } from 'antd';

import RequestCard from '../RequestCard';
import RequestFilter from './RequestFilter';
import './statics/css/styles.css'

class ListEventRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanding: true,
      tab: 'estado:1',
      inscriptions: [],
      inscriptionsApproved: [],
      inscriptionsPending: [],
      inscriptionsDeny: []
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }


  componentDidMount() {
    const { event } = this.props;
    this.props.getEventIscriptionsAsRDR(event)
      .then(
        (res) => {
          const inscriptionsApproved = res.data.filter((i) => i.status == 'approved')
          const inscriptionsPending = res.data.filter((i) => i.status == 'pending')
          const inscriptionsDeny = res.data.filter((i) => i.status == 'deny')
          this.setState({
            loanding: false,
            inscriptions: res.data,
            inscriptionsApproved: inscriptionsApproved,
            inscriptionsPending: inscriptionsPending,
            inscriptionsDeny: inscriptionsDeny
          })
          console.log(this.state)
        }
      )
  }

  handleTabChange(e) {
    this.setState({tab: e.key})
  }
  
  render() {
    const { SubMenu } = Menu;
    return (
      <>
        <div className="ListEventRequest_filter">
          <Menu mode="horizontal" defaultSelectedKeys='1' className="RequestFilter_wrp">
            <SubMenu title="Estado">
              <Menu.Item key="estado:1" onClick={this.handleTabChange}>Todas</Menu.Item>
              <Menu.Item key="estado:2" onClick={this.handleTabChange}>Aprobadas</Menu.Item>
              <Menu.Item key="estado:3" onClick={this.handleTabChange}>Pendientes</Menu.Item>
              <Menu.Item key="estado:4" onClick={this.handleTabChange}>Denegados</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <section className="ListEventRequests__wrp">
          { this.state.tab == "estado:1" &&
            this.state.inscriptions.map((i) => (
              <RequestCard
                key={i.pk}
                loanding={this.props.loanding}
                inscription={i}
              />
            ))
          }
          { this.state.tab == "estado:2" &&
            this.state.inscriptionsApproved.map((i) => (
              <RequestCard
                key={i.pk}
                loanding={this.props.loanding}
                inscription={i}
              />
            ))
          }
          { this.state.tab == "estado:3" &&
            this.state.inscriptionsPending.map((i) => (
              <RequestCard
                key={i.pk}
                loanding={this.props.loanding}
                inscription={i}
              />
            ))
          }
          { this.state.tab == "estado:4" &&
            this.state.inscriptionsDeny.map((i) => (
              <RequestCard
                key={i.pk}
                loanding={this.props.loanding}
                inscription={i}
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
