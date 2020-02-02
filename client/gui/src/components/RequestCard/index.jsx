import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { requestInscriptionApproved, requestInscriptionDeny } from '../../actions/inscriptionsActions'

import { API_HOST } from '../../config'
import { Card, Avatar, Icon, Skeleton, Badge, Descriptions, Statistic } from 'antd';
import './statics/css/styles.css';
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
    const { first_name, last_name } = inscription.user.personal;
    const { avatar } = inscription.user.profile;
    const { pk } = inscription.user;
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
    let actions = [
      <Link to={`/admin/user/${pk}`}><Icon type="profile" key="profile"/></Link>
    ]
    if (this.state.status == 'pending') {
       actions = [
        <Icon type="check" key="check" onClick={this.handleApprove} />,
        <Icon type="close" key="close" onClick={this.handleDeny} />,
        <Link to={`/admin/user/${pk}`} ><Icon type="profile" key="profile"/></Link>
      ]
    }

    return (
      <Card
        style={{ width: 90 + 'vw', marginTop: 16}}
        actions={actions}
      >
        <Skeleton avatar loading={loading}>
          <Meta
            title={inscription.event.title}
            />
          <br/>
          <div className="RequestCard__status_wrp">
            <span className="RequestCard__label">Estado:</span>
            <div className="RequestCard_status_data">
              <Badge status={STATUS[this.state.status].badge} />{STATUS[this.state.status].text}
            </div>
          </div>
          <div className="RequestCard__user_wrp">
            {/* <p>Solicitante:</p> */}
            <span className="RequestCard__label">Solicitante:</span>
            <Link to={`/admin/user/${pk}`} className="RequestCard__user_data">
              <Avatar src={API_HOST + avatar} />
              <span className="RequestCard_user_fullname">{first_name + ' ' + last_name}</span>
            </Link>
            {/* {inscription.user.personal.first_name} {inscription.user.personal.last_name} */}
          </div>
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
