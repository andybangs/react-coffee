// gToOz : Number -> Number
export function gToOz(val) {
  const valStr = val.toString()
  let newVal

  if (valStr.indexOf('.') === -1) {
    newVal = val * 35274 / 1000000
  } else if (valStr.indexOf('.') === valStr.length - 2) {
    newVal = (val * 10 * 35274 / 1000000) / 10
  } else {
    console.error('Error: function gToOz only accepts ints or floats with one digit after the decimal')
  }

  return newVal
}

// ozToG : Number -> Number
export function ozToG(val) {
  const valStr = val.toString()
  let newVal

  if (valStr.indexOf('.') === -1) {
    newVal = val * 283495 / 10000
  } else if (valStr.indexOf('.') === valStr.length - 2) {
    newVal = (val * 10 * 283495 / 10000) / 10
  } else {
    console.error('Error: function ozToG only accepts ints or floats with one digit after the decimal')
  }

  return newVal
}

// incVal : Number -> Number -> Number
export function incVal(val, step) {
  const valStr = val.toString()
  const stepStr = step.toString()

  let newVal

  if (valStr.indexOf('.') === -1 && stepStr.indexOf('.') === -1) {
    newVal = val + step
  } else if (valStr.indexOf('.') === valStr.length - 2 || stepStr.indexOf('.') === stepStr.length - 2) {
    newVal = (val * 10 + step * 10) / 10
  } else {
    console.error('Error: function incVal only accepts ints or floats with one digit after the decimal')
  }

  return newVal
}

// decVal : Number -> Number -> Number
export function decVal(val, step) {
  const valStr = val.toString()
  const stepStr = step.toString()

  let newVal

  if (valStr.indexOf('.') === -1 && stepStr.indexOf('.') === -1) {
    newVal = val - step
  } else if (valStr.indexOf('.') === valStr.length - 2 || stepStr.indexOf('.') === stepStr.length - 2) {
    newVal = (val * 10 - step * 10) / 10
  } else {
    console.error('Error: function decVal only accepts ints or floats with one digit after the decimal')
  }

  return newVal
}

// toDecimal : Number -> Number
export function toDecimal(val) {
  return +(val).toFixed(1)
}
