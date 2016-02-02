import { COFFEE, WATER, RATIO } from '../constants/ingredients'
import { MOD_COFFEE, MOD_WATER, MOD_RATIO } from '../constants/recipe'
import { TOGGLE_UNIT, TOGGLE_EDIT, UPDATE, INC, DEC } from '../constants/operations'
import { ozToG, incVal, decVal, toDecimal } from '../util/math'

function component (ingredient, value, maxValue) {
  return {
    title: ingredient,
    value,
    maxValue,
    displayInOz: false,
    editing: false,
  }
}

const initialState = {
  coffee: component(COFFEE, 20, 100),
  water: component(WATER, 320, 1900),
  ratio: component(RATIO, 16, 19),
}

export default function recipe(state = initialState, action) {
  const { coffee, water, ratio } = state
  const { type, operation, inputVal } = action
  let newCoffeeVal, newWaterVal, newRatioVal

  switch (type) {
    case MOD_COFFEE:
      if (operation === TOGGLE_UNIT) {
        return { ...state,
          coffee: { ...coffee, displayInOz: !coffee.displayInOz }
        }
      } else if (operation === TOGGLE_EDIT) {
        return { ...state,
          coffee: { ...coffee, editing: !coffee.editing }
        }
      } else if (operation === UPDATE) {
          newCoffeeVal = coffee.displayInOz ?
            toDecimal(ozToG(inputVal)) :
            inputVal
      } else if (operation === INC) {
          newCoffeeVal = coffee.displayInOz ?
            toDecimal(incVal(coffee.value, toDecimal(ozToG(0.1)))) :
            toDecimal(incVal(coffee.value, 0.1))
      } else if (operation === DEC) {
          newCoffeeVal = coffee.displayInOz ?
            toDecimal(decVal(coffee.value, toDecimal(ozToG(0.1)))) :
            toDecimal(decVal(coffee.value, 0.1))
      }

      if (newCoffeeVal < 0) newCoffeeVal = 0
      if (newCoffeeVal > coffee.maxValue) newCoffeeVal = coffee.maxValue

      newWaterVal = Math.round(newCoffeeVal * ratio.value)

      return {
        ...state,
        coffee: { ...coffee, value: newCoffeeVal },
        water: { ...water, value: newWaterVal },
      }

    case MOD_WATER:
      if (operation === TOGGLE_UNIT) {
        return { ...state,
          water: { ...water, displayInOz: !water.displayInOz }
        }
      } else if (operation === TOGGLE_EDIT) {
        return { ...state,
          water: { ...water, editing: !water.editing }
        }
      } else if (operation === UPDATE) {
          newWaterVal = water.displayInOz ?
            Math.round(ozToG(inputVal)) :
            inputVal
      } else if (operation === INC) {
          newWaterVal = water.displayInOz ?
            Math.round(incVal(water.value, toDecimal(ozToG(0.1)))) :
            Math.round(incVal(water.value, 1))
      } else if (operation === DEC) {
          newWaterVal = water.displayInOz ?
            Math.round(decVal(water.value, toDecimal(ozToG(0.1)))) :
            Math.round(decVal(water.value, 1))
      }

      if (newWaterVal < 0) newWaterVal = 0
      if (newWaterVal / ratio.value > coffee.maxValue) newWaterVal = coffee.maxValue * ratio.value

      newCoffeeVal = toDecimal(newWaterVal / ratio.value)

      return {
        ...state,
        coffee: { ...coffee, value: newCoffeeVal },
        water: { ...water, value: newWaterVal },
      }

    case MOD_RATIO:
      if (operation === TOGGLE_EDIT) {
        return { ...state,
          ratio: { ...ratio, editing: !ratio.editing }
        }
      } else if (operation === UPDATE) {
          newRatioVal = inputVal
      } else if (operation === INC) {
          newRatioVal = toDecimal(incVal(ratio.value, 0.5))
      } else if (operation === DEC) {
          newRatioVal = toDecimal(decVal(ratio.value, 0.5))
      }

      if (newRatioVal < 1) newRatioVal = 1
      if (newRatioVal > ratio.maxValue) newRatioVal = ratio.maxValue

      newWaterVal = Math.round(coffee.value * newRatioVal)

      return {
        ...state,
        water: { ...water, value: newWaterVal },
        ratio: { ...ratio, value: newRatioVal },
      }

    default:
      return state
  }
}
