import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestInscription , setInscriptions } from '../../actions/inscriptionsActions'
import { Link } from 'react-router-dom';

import { PageHeader, notification, Badge, Button, Statistic, Descriptions, Modal } from 'antd';
import './statics/css/styles.css';

const { confirm } = Modal;

export const openNotification = (type, message) => {
  notification[type]({
    message: message,
    top: 85,
    duration: 1,
    placement: 'topLeft'
  });
};

class Event extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      alreadyInscript: this.userIsInscript()
    }

    this.showConfirm = this.showConfirm.bind(this);
    this.userIsInscript = this.userIsInscript.bind(this);
  }

  userIsInscript = () => {
    console.log(this.props)
    const inscription = this.props.inscriptions.filter((i) => {
      return i.event.pk === this.props.event.pk
    })
    return (inscription.length > 0)
  }

  showConfirm = () => {
    const userId = this.props.user.pk;
    const eventId = this.props.event.pk;
    const requestInscription = this.props.requestInscription;
    const inscriptionSuccess = () => {
      openNotification('success', 'Solicitud enviada!');
      this.props.setInscriptions();
      this.setState({alreadyInscript: true})
    }
    confirm({
      title: 'Enviar solicitud de inscripcion al evento:',
      content: this.props.event.title,
      onOk() {
        let data = {
          event: eventId
        }
        console.log(data)
        requestInscription(data)
          .then(
            (res) => {
              inscriptionSuccess()
            },
            (err) => {
              openNotification('error', err.response.data.user)
            }
          )
      },
      onCancel() {},
    });
  }

  render() {
    const { event } = this.props;
    return (
      <>
        <PageHeader
          // style={{
          //   border: '1px solid rgb(235, 237, 240)',
          // }}
          onBack={() => window.history.back()}
          title={event.title}
        />
        <div className="Event_body_wrp">
          <Descriptions layout="horizontal" bordered >
            <Descriptions.Item label="Tipo">{event.type}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge status="processing" text="Activo" />
            </Descriptions.Item>
            <Descriptions.Item label="Comienza">{event.start_date}</Descriptions.Item>
            <Descriptions.Item label="Termina">{event.end_date}</Descriptions.Item>
            <Descriptions.Item label="Cupos">
              <Statistic title="Inscriptos" value={event.inscriptions} suffix={`/ ${event.max_inscriptions}`} />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            style={{
              'marginTop': '5px',
            }}s
            layout="vertical"
            bordered
          >
            <Descriptions.Item label="Dirección">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
          
          { this.state.alreadyInscript &&  
            <span className="Event_check_inscription">
              Ya enviste la solicitud de inscripcion a este evento.
              Puedes cheaquer el estado <Link to="/requests">aquí</Link>.
            </span>
          }
          <Button
            disabled={this.state.alreadyInscript}
            style={{
              'margin': '30px 0',
              height: "40px"
            }}
            type="primary"
            className="Form_btn"
            onClick={this.showConfirm}
            >
            Inscribirse
          </Button>

        </div>
      </>
    )
  }

}

Event.propTypes = {

};

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    inscriptions: state.inscriptions
  }
}

export default connect(mapStateToProps, {
  requestInscription,
  setInscriptions
})(Event);