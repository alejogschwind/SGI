import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userDetailRDR } from '../../actions/userActions'
import PropTypes from 'prop-types';

import './statics/css/styles.css'
import { Descriptions, PageHeader, Menu, Dropdown, Button, Icon } from 'antd';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      personal: null,
      tab: 'personal',
    }

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.user;
    this.props.userDetailRDR(id)
      .then(
        (res) => {
          console.log(res.data)
          this.setState({
            loading: false,
            username: res.data.username,
            email: res.data.email,
            personal: res.data.personal,
            medical: res.data.medical_record,
            emergencia: res.data.emergency_contact,
          })
        }
      )
  }

  handleMenuClick(e) {
    this.setState({tab: e.key})
  }

  render() {
    const SEXO = {
      m: {
        text: 'Masculino'
      },
      f: {
        text: 'Femenino'
      },
      o: {
        text: 'Otro'
      }
    }
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="personal">
          {/* <Icon type="user" /> */}
          Personales
        </Menu.Item>
        <Menu.Item key="medical">
          {/* <Icon type="user" /> */}
          Medicos
        </Menu.Item>
        <Menu.Item key="institutional">
          {/* <Icon type="user" /> */}
          Institucionales
        </Menu.Item>
        <Menu.Item key="emergency">
          {/* <Icon type="user" /> */}
          Contacto de emergencias
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        { !this.state.loading &&
          <PageHeader
              style={{
                border: '1px solid rgb(235, 237, 240)',
              }}
              onBack={() => window.history.back()}
              title={`${this.state.personal.first_name} ${this.state.personal.last_name}`}
          />
        }

        <section className="UserData_wrp">
          
          <div className="UserData__filter_wrp">
            <Dropdown className="UserData__dropdown" trigger="click" overlay={menu}>
              <Button size="large">
                Datos <Icon type="down" />
              </Button>
            </Dropdown>
          </div>

          { !this.state.loading && this.state.tab === 'personal' &&
            <div className="UserData_personal">
              <Descriptions title="Datos Personales" bordered>
                <Descriptions.Item label="Nombres">{this.state.personal.first_name}</Descriptions.Item>
                <Descriptions.Item label="Apellidos">{this.state.personal.last_name}</Descriptions.Item>
                <Descriptions.Item label="Documento">{this.state.personal.passport}</Descriptions.Item>
                <Descriptions.Item label="Nacimiento">{this.state.personal.birthdate}</Descriptions.Item>
                <Descriptions.Item label="Sexo">{SEXO[this.state.personal.gender].text}</Descriptions.Item>
                <Descriptions.Item label="Trabajo">
                  {this.state.personal.job}
                </Descriptions.Item>
                <Descriptions.Item label="Telefono">
                  {'+' + this.state.personal.prefix + ' ' + this.state.personal.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {this.state.email}
                </Descriptions.Item>
              </Descriptions>
            </div>
          }

          { !this.state.loading && this.state.tab === 'medical' &&
            <div className="UserData_medical">
              <Descriptions title="Ficha Medica" bordered layout="vertical">
                <Descriptions.Item label="Obra Social">{this.state.medical.health_insurance}</Descriptions.Item>
                <Descriptions.Item label="Numero de Afiliado">{this.state.medical.affiliate_number}</Descriptions.Item>
              </Descriptions>
              <br />
              <Descriptions bordered>
                <Descriptions.Item label="Tipo de sangre">{this.state.medical.blood_type}</Descriptions.Item>
                
                <Descriptions.Item label="Dieta especial ?">
                  {this.state.medical.have_special_diet ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_special_diet &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.diet_obs}
                </Descriptions.Item>
                }

                <Descriptions.Item label="Alergia ?">
                  {this.state.medical.have_allergy ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_allergy &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.allergy_obs}
                </Descriptions.Item>
                }

                <Descriptions.Item label="Tratamiento ?">
                  {this.state.medical.have_peridic_treatment ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_peridic_treatment &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.treatment_obs}
                </Descriptions.Item>
                }

                <Descriptions.Item label="Medicación ?">
                  {this.state.medical.have_medication ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_medication &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.medication_obs}
                </Descriptions.Item>
                }

                <Descriptions.Item label="Limitación Fisica ?">
                  {this.state.medical.have_physical_limitation ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_physical_limitation &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.limitation_obs}
                </Descriptions.Item>
                }
              
                <Descriptions.Item label="Cirugías ?">
                  {this.state.medical.have_surgeries ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_surgeries &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.surgeries_obs}
                </Descriptions.Item>
                }
                
                <Descriptions.Item label="Adiccional ?">
                  {this.state.medical.have_additional ? 'Si' : 'No'}
                </Descriptions.Item>
                {this.state.medical.have_additional &&
                <Descriptions.Item label="Observación:">
                  {this.state.medical.additional_obs}
                </Descriptions.Item>
                }

              </Descriptions>
            </div>
          }

          { !this.state.loading && this.state.tab === 'emergency' &&
            <div className="UserData_emergency">
              <Descriptions title="Contacto de Emergencias" bordered>
                <Descriptions.Item label="Nombres">{this.state.emergencia.first_name}</Descriptions.Item>
                <Descriptions.Item label="Apellidos">{this.state.emergencia.last_name}</Descriptions.Item>
                <Descriptions.Item label="Documento">{this.state.emergencia.relationship}</Descriptions.Item>
                <Descriptions.Item label="Telefono">
                  {'+' + this.state.emergencia.prefix + ' ' + this.state.emergencia.phone_number}
                </Descriptions.Item>
              </Descriptions>
            </div>
          }

        </section>
      </>
    );
  }
}

UserData.propTypes = {
  
};

export default connect(null,{
  userDetailRDR
})(UserData);
