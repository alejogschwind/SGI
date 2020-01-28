import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import CardData from '../common/CardData';
import AvatarEdit from '../common/AvatarEdit';

import './statics/css/styles.css'

import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      loading: false
    }
  }
  

  render() {
    console.log(this.props.profile)
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')
    const { profile, first_name, last_name } = this.props;
    return (
      <div className="Profile">
        <div className="Profile_top">
          { this.props.profile && 
            <AvatarEdit avatar={this.props.profile.avatar}/>
          }
          <div className="Info_user">
          { first_name ? 
            <span className="Name">{first_name} {last_name}</span>
          :
            <span className="Name">Completa tu perfil</span>
          }
            <span>0 RP</span>
          </div>
        </div>
        <div className="Card_grid">
          <Link to="/profile/personal">
            <CardData
              name="Personales"
              percent={100}
            />
          </Link>
          <Link to="/profile/medical">
            <CardData
              name="Medicos"
              percent={100}
            />
          </Link>
          <Link to="/profile/institutional">
            <CardData
              name="Institucionales"
              percent={100}
            />
          </Link>
          <Link to="/profile/contact">
            <CardData
              name="Contacto"
              percent={100}
            />
          </Link>
          <Link to="/profile/address">
            <CardData
              name="Direccion"
              percent={100}
            />
          </Link>
        </div>
      </div>
    );
  }
}


Profile.propTypes = {
  
};


export default connect(null, null)(Profile);
