import { MOD_COFFE, MOD_WATER, MOD_RATIO } from '../constants/recipe'

export function modCoffee(operation) {
  return {
    type: MOD_COFFE,
    operation,
  }
}

export function modWater(operation) {
  return {
    type: MOD_WATER,
    operation,
  }
}

export function modRatio(operation) {
  return {
    type: MOD_RATIO,
    operation,
  }
}
