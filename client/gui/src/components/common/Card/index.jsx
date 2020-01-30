import React from 'react';
import { connect } from 'react-redux';
import { requestInscriptionApproved } from '../../../actions/inscriptionsActions';
// import AvatarList from '../AvatarList';

import {Icon, Badge, Modal, Button} from 'antd'
import './statics/css/styles.css'
const { confirm } = Modal;

// function showConfirm() {
//   confirm({
//     title: 'Do you want to delete these items?',
//     content: 'When clicked the OK button, this dialog will be closed after 1 second',
//     onOk() {
//       return new Promise((resolve, reject) => {
//         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//       }).catch(() => console.log('Oops errors!'));
//     },
//     onCancel() {},
//   });
// }

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanding: true,
      inscription: {},
      status: null,
    }
  }
  
  handleApproved = (e) => {
    const id = e.target.getAttribute('data-inscription-id');
    this.props.requestInscriptionApproved(this.state.inscription.pk)
      .then(
        (res) => {
          console.log(res.data)
          this.setState({
            status: 'approved',
          })
        }
        ,(err) => {
          console.log(err)

        }
      )
  }

  handleDeny = (e) => {
    console.log(e)
  }
  
  componentDidMount() {
    this.setState({
      loanding: false,
      inscription: this.props.inscription,
      status: this.props.inscription.status
    })
  }

  render() {
    const { status } = this.state;
    const { id, user, event } = this.state.inscription;
    console.log(user)
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
      <>
        { !this.state.loanding &&
          <div className="Card__wrapper">
            <div className="Card_right">
              <div className="Card__mid">
                <span> <Badge status={STATUS[status].badge} />{STATUS[status].text}</span>
              </div>
              <div>
                <span className="Card__label">Solicitante: </span>
                <samp>{user.personal.first_name} {user.personal.last_name}</samp>
              </div>
              <div className="Card__top">
                <span className="Card__label">Evento: </span>
                <span>{event.title}</span>
              </div>
            </div>
            <div className="Card_options_wrp">
              { status != 'approved' &&
                <div className="Card_option" data-inscription-id={id} onClick={this.handleApproved}></div>
              }
              <div className="Card_option" onClick={this.handleDeny}></div>
            </div>
          </div>
        }
      </>
    );
  }
}

export default connect(null, { requestInscriptionApproved })(Card);