import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import AdminLayout from './AdminLayout';
import axios from 'axios';

const { Option } = Select;

class Event extends Component {
  constructor(props) {
    super(props)

  }


  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:8000/events', values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <AdminLayout>
          <Form>
            <h2>Nuevo Evento</h2>
            <Form.Item label="Nombre:" style={{marginRight: 40 +'px'}}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese el nombre del evento!',
                  }
                ],
              })(<Input size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
            </Form.Item>

            <Form.Item label="Descripcion Corta:">
              {getFieldDecorator('short_description', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese la descripcion corta del evento!',
                  }
                ],
              })(<Input size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
            </Form.Item>
            
            <Form.Item label="Tipo:">
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese el tipo de evento!',
                  }
                ],
              })(<Select size="large" maxLength={40} style={{width: 440 +'px'}}>
                <Option value="ED">Evento Distrital</Option>
                <Option value="EA">Evento AIRAUP</Option>
              </Select>)}
            </Form.Item>

            <Form.Item label="Comienza:">
              {getFieldDecorator('start_date', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese la fecha que comienza el evento!',
                  }
                ],
              })(<DatePicker showTime size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
            </Form.Item>

            <Form.Item label="Termina:">
              {getFieldDecorator('end_date', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese la fecha que termina el evento!',
                  }
                ],
              })(<DatePicker showTime size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
            </Form.Item>
            
            <Form.Item label="Cupo:">
              {getFieldDecorator('max_inscriptions', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese el cupo del evento!',
                  }
                ],
              })(<InputNumber size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
            </Form.Item>

            <Button type="primary" onClick={this.handleSubmit} htmlType="submit">
              Crear Evento
            </Button>
          </Form>
        </AdminLayout>
      </div>
    );
  }
}

const EventForm = Form.create({ name: 'event-data-form' })(Event);


EventForm.propTypes = {
  
};


export default EventForm;
