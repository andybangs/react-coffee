import React, { PropTypes } from 'react'
import cL from 'classnames'

import { COFFEE, WATER, RATIO } from '../constants/ingredients'
import { TOGGLE_UNIT, TOGGLE_EDIT, UPDATE, INC, DEC } from '../constants/operations'
import { gToOz, toDecimal } from '../util/math'

const Panel = (props) => {
  const { component, op } = props
  const { title, value, displayInOz, editing } = component

  const displayValue = displayInOz ? toDecimal(gToOz(value)) : value
  const unitText = displayInOz ? 'ounces' : 'grams'

  function handleUpdate(ev) {
    const inputVal = parseInt(ev.target.value, 10)
    if (isNaN(inputVal)) return
    op(UPDATE, inputVal)
  }

  function handleSubmit(ev) {
    if (ev.which === 13) op(TOGGLE_EDIT)
  }

  const valInput =
    <input type="number"
      pattern="[0-9]*"
      inputMode="numeric"
      value={displayValue}
      onChange={handleUpdate}
      onKeyDown={handleSubmit}
      onBlur={() => op(TOGGLE_EDIT)}
      autoFocus>
    </input>

  const ingredientDisplay =
    <h1 onClick={() => op(TOGGLE_EDIT)}>
      {displayValue}
    </h1>

  const ratioDisplay =
    <h1 onClick={() => op(TOGGLE_EDIT)}>
      {`1:${displayValue}`}
    </h1>

  const componentMain = editing ?
    valInput :
    title !== RATIO ? ingredientDisplay : ratioDisplay

  const componentUnit = title !== RATIO ?
    <a className="unit"
      onClick={() => op(TOGGLE_UNIT)}>
      {unitText}
    </a> :
    null

  return (
    <div className={ cL( "column", title) }>

      <div className="flex-2">
        <h2>{title}</h2>
      </div>

      <div className="flex-2">
        {componentMain}
      </div>

      <div className="flex-1">
        {componentUnit}
      </div>

      <div className="flex-1"></div>

      <div className={ cL("flex-1", "button-cont") }>
        <a className={ cL("button", "button-left") }
          onClick={() => op(DEC)}>
          –
        </a>
        <a className={ cL("button", "button-right") }
          onClick={() => op(INC)}>
          +
        </a>
      </div>

      <div className="flex-1"></div>

    </div>
  )
}

Panel.propTypes = {
  component: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    displayInOz: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  }).isRequired,
  op: PropTypes.func.isRequired,
}

export default Panel
