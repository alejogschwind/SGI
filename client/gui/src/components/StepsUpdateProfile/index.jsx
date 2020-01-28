import React, { Component } from 'react'
import { Steps, Button, message } from 'antd';

// Components
import PersonalDataForm from './PersonalDataForm';
import MedicalRecordsForm from './MedicalRecordsForm';
import EmergencyContactForm from './EmergencyContactForm';
import InstitutionalForm from './InstitutionalForm';
import ConfirmData from './ConfirmData';

import './styles.css'

const { Step } = Steps;

export class StepsUpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      first_name: '',
      last_name: '',
      gender: '',
      birthday: '19/08/1997',
      passport: '',
      prefix: '54',
      phone_number: '',
      job: '',
      health_insurance: '',
      affiliate_number: '',
      blood_type: '',
      allergy: null,
      allergy_obs: '',
      special_diet: null,
      special_diet_obs: '',
      periodic_treatment: null,
      periodic_treatment_obs: '',
      physical_limitation: null,
      physical_limitation_obs: '',
      medication: null,
      medication_obs: '',
      surgeries: null,
      surgeries_obs: '',
      additional_data: null,
      additional_obs: '',
      econtact_first_name: '',
      econtact_last_name: '',
      econtact_relation: '',
      econtact_prefix: '54',
      econtact_phone_number: '',
      weel: '',
      airaup_commission: '',
      airaup_position: '',
      district: '',
      district_position: '',
      club: '',
      club_position: '',
    };

    this.update = this.update.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
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
    let bodyReq = this.state;
    delete bodyReq.step;
    console.log(bodyReq)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelection = newState => {
    this.setState(newState)
  }

  render() {
    const { step } = this.state;
    const {
      first_name,
      last_name,
      gender,
      birthday,
      passport,
      prefix,
      phone_number,
      job,
      health_insurance,
      affiliate_number,
      blood_type,
      allergy,
      allergy_obs,
      special_diet,
      special_diet_obs,
      periodic_treatment,
      periodic_treatment_obs,
      physical_limitation,
      physical_limitation_obs,
      medication,
      medication_obs,
      surgeries,
      surgeries_obs,
      additional_data,
      additional_obs,
      econtact_first_name,
      econtact_last_name,
      econtact_relation,
      econtact_prefix,
      econtact_phone_number,
      weel,
      airaup_commission,
      airaup_position,
      district,
      district_position,
      club,
      club_position,
    } = this.state;
    
    const steps = [
      {
        key: 1,
        title: 'Personales',
        content: 
        <PersonalDataForm
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          handleSelection={this.handleSelection}
          values={{
            first_name,
            last_name,
            gender,
            birthday,
            passport,
            prefix,
            phone_number,
            job
          }}
        />,
      },
      {
        key: 2,
        title: 'Medicos',
        content: 
        <MedicalRecordsForm
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          handleSelection={this.handleSelection}
          values={{
            health_insurance,
            affiliate_number,
            blood_type,
            allergy,
            allergy_obs,
            special_diet,
            special_diet_obs,
            periodic_treatment,
            periodic_treatment_obs,
            physical_limitation,
            physical_limitation_obs,
            medication,
            medication_obs,
            surgeries,
            surgeries_obs,
            additional_data,
            additional_obs,
          }}
        />,
      },
      {
        key: 3,
        title: 'Contacto de Emergencias',
        content: 
        <EmergencyContactForm
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          handleSelection={this.handleSelection}
          values={{
            econtact_first_name,
            econtact_last_name,
            econtact_relation,
            econtact_prefix,
            econtact_phone_number,
          }}
        />,
      },
      {
        key: 4,
        title: 'Institucional',
        content: 
        <InstitutionalForm
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          handleSelection={this.handleSelection}
          values={{
            weel,
            airaup_commission,
            airaup_position,
            district,
            district_position,
            club,
            club_position,
          }}
        />,
      },
      {
        key: 5,
        title: 'Confirmar Datos',
        content: 
        <ConfirmData
          prevStep={this.prevStep}
          update={this.update}
          personalValues={{
            'Nombres': first_name,
            'Apellidos': last_name,
            'Sexo': gender,
            'Fecha de Nacimiento': birthday,
            'Documento de Identidad':passport,
            'Numero de Telefono:': '+' + prefix + phone_number,
            'Ocupacion':job,
          }}
          medicalValues={{
            'Obra Social:':health_insurance,
            'Numero de Afiliado':affiliate_number,
            'Tipo de Sangre':blood_type,
            'Alergia?': allergy,
            'Observacion Alergia':allergy_obs,
            'Dieta especial':special_diet,
            'Obseracion Dieta':special_diet_obs,
            'Tratamiento Periodico?':periodic_treatment,
            'Observacion Tratamineto':periodic_treatment_obs,
            'Limitacion Fisica?':physical_limitation,
            'Observacion Limitacion Fisica':physical_limitation_obs,
            'Medicacion?':medication,
            'Obseracion Medicacion':medication_obs,
            'Cirugia?':surgeries,
            'Observacion Cirugia':surgeries_obs,
            'Datos Adicionales?':additional_data,
            'Datos Adicionales':additional_obs,
          }}
          eContactValues={{
            'Nombre':econtact_first_name,
            'Apellido':econtact_last_name,
            'Relacion':econtact_relation,
            'Numero': '+' + econtact_prefix + econtact_phone_number,
          }}
          institutionalValues={{
            'Rueda':weel,
            'Comision AIRAUP':airaup_commission,
            'Cargo AIRAUP':airaup_position,
            'Distrito':district,
            'Cargo Distrito':district_position,
            'Club':club,
            'Cargo Club':club_position,
          }}
        />,
      },
    ];
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
    )
  }
}

export default StepsUpdateProfile
