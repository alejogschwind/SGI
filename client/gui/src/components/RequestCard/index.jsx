import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { requestInscriptionApproved } from '../../actions/inscriptionsActions'

import { Card, Icon, Skeleton, Badge, Descriptions, Statistic } from 'antd';
const { Meta } = Card;

class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.inscription.status
    }

    this.handleApprove = this.handleApprove.bind(this);
  }

  handleApprove() {
    const { pk } = this.props.inscription;
    this.props.requestInscriptionApproved(pk)
      .then(
        (res) => {
          this.props.getData()
          console.log(res.data)
          this.setState({
            status: 'approved'
          })
        }
      )
  }

  handleDeny() {

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
    return (
      <Card
        style={{ width: 90 + 'vw', marginTop: 16}}
        actions={[
          <Icon type="check" key="check" onClick={this.handleApprove}/>,
          <Icon type="close" key="close" onClick={this.handleDeny}/>,
        ]}
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
  requestInscriptionApproved
})(RequestCard);
