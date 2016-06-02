import { MOD_COFFEE, MOD_WATER, MOD_RATIO } from '../constants/recipe';

export const modCoffee = (operation, inputVal) => ({
  type: MOD_COFFEE,
  operation,
  inputVal,
});

export const modWater = (operation, inputVal) => ({
  type: MOD_WATER,
  operation,
  inputVal,
});

export const modRatio = (operation, inputVal) => ({
  type: MOD_RATIO,
  operation,
  inputVal,
});
