import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './styles.css'

function EventCard(props) {
  return (
    <Link to={`/event/${props.id}`} className="EventCard_wrp">
      <div className="EventCard_top">
        <h3 className="EventCard_type">{props.type}</h3>
      </div>
      <div className="EventCard_bottom">
        <h2 className="EventCard_title">{props.title}</h2>
        <div className="EventCard_info">
          <div className="EventCard_dates_wrp">
            <h4 className="EventCard_infotext">Comienza: <span>{props.start_date}</span></h4>
            <h4 className="EventCard_infotext">Termina: <span>{props.end_date}</span></h4>
          </div>
          <div className="EventCard_inscriptions_wrp">
            <h4 className="EventCard_infotext">Inscriciones: <span>{props.inscriptions}/{props.max_inscriptions}</span></h4>
          </div>
        </div>
      </div>
    </Link>
  )
}

EventCard.propTypes = {

}

export default EventCard

