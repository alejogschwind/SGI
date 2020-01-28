import React from 'react'
import PropTypes from 'prop-types'

import { Progress } from 'antd'
import './statics/css/styles.css'

function CardData({name, percent}) {
  return (
    <div className="CardData_wrp">
      <div className="CardData_progress">
        <Progress
          type="circle"
          width={60}
          percent={percent}
        />
      </div>
      <span className={ percent === 100 ? "CardData_complete" : "CardData_name" }>{name}</span>
    </div>
  )
}

CardData.propTypes = {
  name: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired
}

export default CardData

