//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

// isInt : Number -> Bool
function isInt(num) {
  const str = num.toString();
  return str.indexOf('.') === -1;
}

// isAcceptableFloat : Number -> Bool
function isAcceptableFloat(num) {
  const str = num.toString();
  return str.indexOf('.') === str.length - 2;
}


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

// gToOz : Number -> Number
export function gToOz(val) {
  const errMsg = 'Error: gToOz only accepts values with 0 or 1 decimal places';
  let newVal;

  if (isInt(val)) {
    newVal = val * 35274 / 1000000;
  } else if (isAcceptableFloat(val)) {
    newVal = (val * 10 * 35274 / 1000000) / 10;
  } else {
    console.error(errMsg);
  }

  return newVal;
}

// ozToG : Number -> Number
export function ozToG(val) {
  const errMsg = 'Error: ozToG only accepts values with 0 or 1 decimal places';
  let newVal;

  if (isInt(val)) {
    newVal = val * 283495 / 10000;
  } else if (isAcceptableFloat(val)) {
    newVal = (val * 10 * 283495 / 10000) / 10;
  } else {
    console.error(errMsg);
  }

  return newVal;
}

// incVal : Number -> Number -> Number
export function incVal(val, step) {
  const errMsg = 'Error: incVal only accepts values with 0 or 1 decimal places';
  let newVal;

  if (isInt(val) && isInt(step)) {
    newVal = val + step;
  } else if (isAcceptableFloat(val) || isAcceptableFloat(step)) {
    newVal = (val * 10 + step * 10) / 10;
  } else {
    console.error(errMsg);
  }

  return newVal;
}

// decVal : Number -> Number -> Number
export function decVal(val, step) {
  const errMsg = 'Error: decVal only accepts values with 0 or 1 decimal places';
  let newVal;

  if (isInt(val) && isInt(step)) {
    newVal = val - step;
  } else if (isAcceptableFloat(val) || isAcceptableFloat(step)) {
    newVal = (val * 10 - step * 10) / 10;
  } else {
    console.error(errMsg);
  }

  return newVal;
}

// toDecimal : Number -> Number
export function toDecimal(val) {
  return +(val).toFixed(1);
}
