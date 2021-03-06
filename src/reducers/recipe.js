import { COFFEE, WATER, RATIO } from '../constants/ingredients';
import { MOD_COFFEE, MOD_WATER, MOD_RATIO } from '../constants/recipe';
import { TOGGLE_UNIT, TOGGLE_EDIT, UPDATE, INC, DEC } from '../constants/operations';
import { ozToG, incVal, decVal, toDecimal } from '../util/math';

/* TYPES -----------------------------------------------------------------------
type alias Component = {
  title :: String,
  value :: Number,
  maxValue :: Number,
  displayInOz :: Bool,
  editing :: Bool,
}

type alias RecipeState = {
  coffee :: Component,
  water :: Component,
  ratio :: Component,
}

type alias Action = String
----------------------------------------------------------------------------- */

// createComponent :: String -> Number -> Number -> Component
const createComponent = (title, value, maxValue) => ({
  title,
  value,
  maxValue,
  displayInOz: false,
  editing: false,
});

// toggleUnit :: Component -> Component
const toggleUnit = (component) => ({
  ...component,
  displayInOz: !component.displayInOz,
});

// toggleEdit :: Component -> Component
const toggleEdit = (component) => ({
  ...component,
  editing: !component.editing,
});

// initialState :: RecipeState
const initialState = {
  coffee: createComponent(COFFEE, 20, 500),
  water: createComponent(WATER, 320, 9750),
  ratio: createComponent(RATIO, 16, 19.5),
};

// recipe :: RecipeState -> Action -> RecipeState
export default function recipe(state = initialState, action) {
  const { coffee, water, ratio } = state;
  const { type, operation, inputVal } = action;
  let newCoffeeVal;
  let newWaterVal;
  let newRatioVal;

  switch (type) {
    case MOD_COFFEE:
      if (operation === TOGGLE_UNIT) {
        return { ...state, coffee: toggleUnit(coffee) };
      }

      if (operation === TOGGLE_EDIT) {
        return { ...state, coffee: toggleEdit(coffee) };
      }

      if (operation === UPDATE) {
        newCoffeeVal = coffee.displayInOz ?
          toDecimal(ozToG(inputVal)) :
          inputVal;
      } else if (operation === INC) {
        newCoffeeVal = coffee.displayInOz ?
          toDecimal(incVal(coffee.value, toDecimal(ozToG(0.1)))) :
          toDecimal(incVal(coffee.value, 0.1));
      } else if (operation === DEC) {
        newCoffeeVal = coffee.displayInOz ?
          toDecimal(decVal(coffee.value, toDecimal(ozToG(0.1)))) :
          toDecimal(decVal(coffee.value, 0.1));
      }

      if (newCoffeeVal < 0) newCoffeeVal = 0;
      if (newCoffeeVal > coffee.maxValue) newCoffeeVal = coffee.maxValue;

      newWaterVal = Math.round(newCoffeeVal * ratio.value);

      return {
        ...state,
        coffee: { ...coffee, value: newCoffeeVal },
        water: { ...water, value: newWaterVal },
      };

    case MOD_WATER:
      if (operation === TOGGLE_UNIT) {
        return { ...state, water: toggleUnit(water) };
      }

      if (operation === TOGGLE_EDIT) {
        return { ...state, water: toggleEdit(water) };
      }

      if (operation === UPDATE) {
        newWaterVal = water.displayInOz ?
          Math.round(ozToG(inputVal)) :
          inputVal;
      } else if (operation === INC) {
        newWaterVal = water.displayInOz ?
          Math.round(incVal(water.value, toDecimal(ozToG(0.1)))) :
          Math.round(incVal(water.value, 1));
      } else if (operation === DEC) {
        newWaterVal = water.displayInOz ?
          Math.round(decVal(water.value, toDecimal(ozToG(0.1)))) :
          Math.round(decVal(water.value, 1));
      }

      if (newWaterVal < 0) newWaterVal = 0;
      if (newWaterVal / ratio.value > coffee.maxValue) {
        newWaterVal = coffee.maxValue * ratio.value;
      }

      newCoffeeVal = toDecimal(newWaterVal / ratio.value);

      return {
        ...state,
        coffee: { ...coffee, value: newCoffeeVal },
        water: { ...water, value: newWaterVal },
      };

    case MOD_RATIO:
      if (operation === TOGGLE_EDIT) {
        return { ...state, ratio: toggleEdit(ratio) };
      }

      if (operation === UPDATE) {
        newRatioVal = inputVal;
      } else if (operation === INC) {
        newRatioVal = toDecimal(incVal(ratio.value, 0.5));
      } else if (operation === DEC) {
        newRatioVal = toDecimal(decVal(ratio.value, 0.5));
      }

      if (newRatioVal < 1) newRatioVal = 1;
      if (newRatioVal > ratio.maxValue) newRatioVal = ratio.maxValue;

      newWaterVal = Math.round(coffee.value * newRatioVal);

      return {
        ...state,
        water: { ...water, value: newWaterVal },
        ratio: { ...ratio, value: newRatioVal },
      };

    default:
      return state;
  }
}
