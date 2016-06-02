import React, { PropTypes } from 'react';
import cL from 'classnames';

import { RATIO } from '../constants/ingredients';
import { TOGGLE_UNIT, TOGGLE_EDIT, UPDATE, INC, DEC } from '../constants/operations';
import { gToOz, toDecimal } from '../util/math';

const Panel = (props) => {
  const { component, op } = props;
  const { title, value, displayInOz, editing } = component;

  const displayValue = displayInOz ? toDecimal(gToOz(value)) : value;
  const unitText = displayInOz ? 'ounces' : 'grams';

  function handleUpdate(e) {
    let inputVal = parseInt(e.target.value, 10);
    if (isNaN(inputVal)) inputVal = 0;
    op(UPDATE, inputVal);
  }

  function handleSubmit(e) {
    if (e.which === 13) op(TOGGLE_EDIT);
  }

  function handleFocus(e) {
    e.target.select();
  }

  const toggleEdit = () => op(TOGGLE_EDIT);
  const toggleUnit = () => op(TOGGLE_UNIT);
  const inc = () => op(INC);
  const dec = () => op(DEC);

  const valInput = (
    <input
      type="number"
      pattern="[0-9]*"
      inputMode="numeric"
      value={displayValue}
      onChange={handleUpdate}
      onKeyDown={handleSubmit}
      onBlur={toggleEdit}
      onFocus={handleFocus}
      autoFocus
    >
    </input>
  );

  const ingredientDisplay = <h1 onClick={toggleEdit}>{displayValue}</h1>;
  const ratioDisplay = <h1 onClick={toggleEdit}>{`1:${displayValue}`}</h1>;
  const componentDisplay = title !== RATIO ? ingredientDisplay : ratioDisplay;
  const componentMain = editing ? valInput : componentDisplay;
  const componentUnit = title !== RATIO ?
    <a className="unit" onClick={toggleUnit}>{unitText}</a> : null;

  return (
    <div className={cL('column', title)}>

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

      <div className={cL('flex-1', 'button-cont')}>
        <a className={cL('button', 'button-left')} onClick={dec}>–</a>
        <a className={cL('button', 'button-right')} onClick={inc}>+</a>
      </div>

      <div className="flex-1"></div>
    </div>
  );
};

Panel.propTypes = {
  component: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    displayInOz: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  }).isRequired,
  op: PropTypes.func.isRequired,
};

export default Panel;
