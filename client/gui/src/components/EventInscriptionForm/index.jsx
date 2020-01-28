import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Button, message } from 'antd';
import ConfirmData from '../StepsUpdateProfile/ConfirmData'
import TransportForm from './TransportForm'
import { requestInscription } from '../../actions/inscriptionsActions'
import { connect } from 'react-redux'
import { addFlashMessage, deleteAllFlashMessage } from '../../actions/flashMessages'


import API from '../../api'

const { Step } = Steps;

class EventInscriptionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      loading: true,
      event: {}
    }

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const api = new API({ url: 'http://localhost:8000'});
    api.createEntity({ name: 'events'})
    api.endpoints.events.getOne({ id })
      .then(
        (res) => {
          console.log(res.data)
          this.setState({ loading: false, event: res.data })
        }
      )
  }

  nextStep() {
    const { step } = this.state;
    this.setState({
      step: step + 1
    })
  }
  
  prevStep() {
    const { step } = this.state;
    this.setState({
      step: step - 1
    })
  }

  update() {
    console.log('Inscripto!')
    window.history.back()
  }

  render() {
    console.log(this.state)
    const { step } = this.state;
    const steps = [
      {
        key: 1,
        title: 'Confirmar Inscripcion',
        content: 
        <TransportForm
          event={this.state.event.title}
          id={this.state.event.pk}
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          sendReq={this.props.requestInscription}
          addFlashMessage={addFlashMessage}
          deleteAllFlashMessage={deleteAllFlashMessage}
        />
      }
    ]
    return (
      <div>
        <Steps current={step} className="Steps_wrapper">
          {steps.map(item => (
            <Step
              key={item.key}
              title={item.title}
              className="Step_wrapper"
            />
          ))}
        </Steps>
        <div className="Step_content">
          {steps[step].content}
        </div>
      </div>
    );
  }
}


EventInscriptionForm.propTypes = {
  
};

const mapDispatchToProps = {
  requestInscription,
  addFlashMessage,
  deleteAllFlashMessage
}

export default connect(null, mapDispatchToProps)(EventInscriptionForm);
