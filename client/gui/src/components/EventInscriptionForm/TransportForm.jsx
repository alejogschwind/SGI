import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {deleteAllFlashMessage, addFlashMessage} from '../../actions/flashMessages'
import FlashMessagesList from '../FlashMessagesList';

class TransportForm extends Component {
  constructor(props) {
    super(props)
    this.send = this.send.bind(this)
  }

  send(e) {
    console.log(this.state)
    e.preventDefault();
    const userId = localStorage.getItem('userId')
    const data = {
      user: Number(userId),
      event: this.props.id
    }

    this.props.sendReq(data, data.event)
      .then(
        () => {},
        (res) => {
          console.log(res.response)
          deleteAllFlashMessage()
          addFlashMessage({
            type: 'error',
            text: res.response.data.user
          });
        }
      )
    window.history.back()
  }

  back = e => {
    e.preventDefault();
    window.history.back()
  }
  
  render() {
    console.log(this.props)
    return (
      <div>
        <FlashMessagesList />
        <h2>Solicitud de inscripcion</h2>
        <h3>{this.props.event}</h3>

        <div className="Form_two_btn_wrp">
          <Button
            type="secondary"
            size="large"
            className="Form_btn"
            onClick={this.back}>
            Volver
          </Button>
          <Button
            type="primary"
            size="large"
            className="Form_btn"
            onClick={this.send}>
            Confirmar
          </Button>
        </div>
      </div>
    );
  }
}

TransportForm.propTypes = {

};

export default TransportForm;