import React from 'react';

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

const { Option } = Select;

class Address extends React.Component {
  state = {
    is_apartment: false
  }
  
  handleChange= e => {
    console.log(this.props)
    if (e) {
      this.setState({is_apartment: true});
    } else {
      this.setState({is_apartment: false});
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    // TODO: Use for Contry Selector.
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    ///////

    return (
      <Form>
        <h2>Address Data:</h2>
        <Input.Group compact>
          <Form.Item label="Contry:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('contry', {
              rules: [
                {
                  required: true,
                  message: 'Please input your contry!',
                }
              ],
            })(<Input size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
          </Form.Item>

          <Form.Item label="Province:">
            {getFieldDecorator('state', {
              rules: [
                {
                  required: true,
                  message: 'Please input your province!',
                }
              ],
            })(<Input size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
          </Form.Item>
        </Input.Group>

        <Input.Group compact>
          <Form.Item label="City:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('city', {
              rules: [
                {
                  required: true,
                  message: 'Please input your city!',
                }
              ],
            })(<Input size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
          </Form.Item>
          <Form.Item label="Address:">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: 'Please input your address!',
                }
              ],
            })(<Input size="large" maxLength={40} style={{width: 440 +'px'}}/>)}
          </Form.Item>
        </Input.Group>

        <Input.Group compact>
          <Form.Item label="¿Es un departamento?" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('is_apartment', {
              rules: [
                {
                  required: true,
                  message: 'Please answer the input!',
                }
              ],
            })(<Select size="large" style={{width: 440 +'px'}} onChange={this.handleChange}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>)}
          </Form.Item>
          
          {this.state.is_apartment && 
            <Input.Group compact style={{width: 440 +'px'}}>
              <Form.Item label="Floor:" style={{marginRight: 40 +'px'}}>
                {getFieldDecorator('floor', {
                  rules: [
                    {
                      required: this.state.is_apartment,
                      message: 'Please input your floor!',
                    }
                  ],
                })(<Input size="large" maxLength={40} style={{width: 200 +'px'}}/>)}
              </Form.Item>

              <Form.Item label="Apartment:">
                {getFieldDecorator('apartment', {
                  rules: [
                    {
                      required: this.state.is_apartment,
                      message: 'Please input your apartment!',
                    }
                  ],
                })(<Input size="large" maxLength={40} style={{width: 200 +'px'}}/>)}
              </Form.Item>
            </Input.Group>
          }
        </Input.Group>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Save Address
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AddressForm = Form.create({ name: 'personal-data-form' })(Address);

export default AddressForm;