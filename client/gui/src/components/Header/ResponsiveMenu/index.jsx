import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './statics/css/styles.css'

function ResponsiveMenu(props) {
  const { avatar, first_name, last_name, open, toggleMenu, is_RDR } = props;
  return (
    <div className={open ? "Menu_back Menu_display": "Menu_back Menu_close"}>
      <div className="Menu_top">
        <div className="Close_Menu"></div>
        { avatar && <Link to="/profile" onClick={toggleMenu}><img className="Avatar" src={avatar}/></Link>}
        <div className="Account_details">
          <span className="Username">{first_name} {last_name}</span>
          <span className="AdminUser"></span>
          <span className="With_Us">1 month with us</span>
        </div>
      </div>
      <div className="Menu_center">
        <ul className="Menu_links">
          <li><Link to="/" onClick={toggleMenu}>Eventos</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Perfil</Link></li>
          <li><Link to="/requests" onClick={toggleMenu}>Solicitudes</Link></li>
          { is_RDR && <li><Link to="/admin" onClick={toggleMenu}>Administración</Link></li>}
          {/* <li><Link to="/config" onClick={toggleMenu}>Settings</Link></li> */}
        </ul>
      </div>
      <div className="Menu_bottom">
        <div className="Notifications"></div>
        <div className="Vertiacal_div"></div>
        <div className="Rotapoints">1050 Rotapoints</div>
        <div className="Vertiacal_div"></div>
        <Link to="/login"><div className="Log_out"></div></Link>
      </div>
    </div>
  )
}

ResponsiveMenu.propTypes = {

}

export default ResponsiveMenu;

