import React from 'react'
import PropTypes from 'prop-types'

function MenuBtn({ open }) {
  return (
    <div className="Hamburger_menu">
      <svg width="20" height="20" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="20" y2="1" stroke="#505050" strokeWidth="2"/>
        <line y1="16" x2="20" y2="16" stroke="#505050" strokeWidth="2"/>
        <line y1="8" x2="20" y2="8" stroke="#505050" strokeWidth="2"/>
      </svg>
    </div>
  )
}

MenuBtn.propTypes = {

}

export default MenuBtn


