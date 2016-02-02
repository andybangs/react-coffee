import { MOD_COFFE, MOD_WATER, MOD_RATIO, INC, DEC } from '../constants/recipe'

const initialState = { coffee: 20, water: 320, ratio: 16 }

export default function recipe(state = initialState, action) {
  switch (action.type) {
    case MOD_COFFE:
      if (action.operation === INC) {
        return { ...state, coffee: state.coffee + 1 }
      } else if (action.operation === DEC) {
        return { ...state, coffee: state.coffee - 1 }
      } else {
        return state
      }

    case MOD_WATER:
      if (action.operation === INC) {
        return { ...state, water: state.water + 1 }
      } else if (action.operation === DEC) {
        return { ...state, water: state.water - 1 }
      } else {
        return state
      }

      case MOD_RATIO:
        if (action.operation === INC) {
          return { ...state, ratio: state.ratio + 1 }
        } else if (action.operation === DEC) {
          return { ...state, ratio: state.ratio - 1 }
        } else {
          return state
        }

    default:
      return state
  }
}
