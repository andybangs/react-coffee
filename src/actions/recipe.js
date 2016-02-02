import { MOD_COFFEE, MOD_WATER, MOD_RATIO } from '../constants/recipe'

export function modCoffee(operation, inputVal) {
  return {
    type: MOD_COFFEE,
    operation,
    inputVal,
  }
}

export function modWater(operation, inputVal) {
  return {
    type: MOD_WATER,
    operation,
    inputVal,
  }
}

export function modRatio(operation, inputVal) {
  return {
    type: MOD_RATIO,
    operation,
    inputVal,
  }
}
