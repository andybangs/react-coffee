import React, { PropTypes } from 'react'
import cL from 'classnames'
import { INC, DEC } from '../constants/recipe'

const Panel = (props) => {
  const { title, value, operation } = props
  return (
    <div className={ cL( "column", title) }>

      <div className="flex-2">
        <h2>{title}</h2>
      </div>

      <div className="flex-2">
        <h1>{value}</h1>
      </div>

      <div className="flex-1">
        <a className="unit">unit</a>
      </div>

      <div className="flex-1"></div>

      <div className={ cL("flex-1", "button-cont") }>
        <a className={ cL("button", "button-left") }
          onClick={() => operation(DEC)}>
          –
        </a>
        <a className={ cL("button", "button-right") }
          onClick={() => operation(INC)}>
          +
        </a>
      </div>

      <div className="flex-1"></div>

    </div>
  )
}

export default Panel
