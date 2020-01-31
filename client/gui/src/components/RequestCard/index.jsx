import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { requestInscriptionApproved, requestInscriptionDeny } from '../../actions/inscriptionsActions'

import { Card, Icon, Skeleton, Badge, Descriptions, Statistic } from 'antd';
const { Meta } = Card;

class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.inscription.status
    }

    this.handleDeny = this.handleDeny.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
  }

  handleApprove() {
    const { pk } = this.props.inscription;
    this.props.requestInscriptionApproved(pk)
      .then(
        (res) => {
          this.props.getData()
          this.setState({
            status: 'approved'
          })
        }
      )
  }

  handleDeny() {
    const { pk } = this.props.inscription;
    this.props.requestInscriptionDeny(pk)
      .then(
        (res) => {
          this.props.getData()
          this.setState({
            status: 'deny'
          })
        }
      )
  }

  render() {
    const { inscription, loading } = this.props;
    const STATUS = {
      pending: {
        badge: 'processing',
        text: 'Pendiente de aprobación'
      },
      approved: {
        badge: 'success',
        text: 'Aprobada'
      },
      deny: {
        badge: 'error',
        text: 'Denegada'
      },
      cancelled: {
        badge: 'default',
        text: 'Cancelada'
      }
    }
    const actions = []
    if (this.state.status == 'pending') {
       actions = [
        <Icon type="check" key="check" onClick={this.handleApprove}/>,
        <Icon type="close" key="close" onClick={this.handleDeny}/>,
      ]
    }

    return (
      <Card
        style={{ width: 90 + 'vw', marginTop: 16}}
        actions={actions}
      >
        <Skeleton loading={loading}>
          <Meta
            title={inscription.event.title}
            />
          <br/>
          <Badge status={STATUS[this.state.status].badge} />{STATUS[this.state.status].text}
          <Descriptions>
            <Descriptions.Item label="Solicitante">{inscription.user.personal.first_name} {inscription.user.personal.last_name}</Descriptions.Item>
          </Descriptions>
          {/* <Statistic title="Inscriptos" value={this.props.inscriptions} suffix={'/ '+ this.props.max_inscriptions} /> */}
        </Skeleton>
      </Card>
    );
  }
}


RequestCard.propTypes = {
  
};


export default connect(null,{
  requestInscriptionApproved,
  requestInscriptionDeny
})(RequestCard);
