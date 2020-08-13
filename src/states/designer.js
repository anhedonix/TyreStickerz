import React from 'react'
import _ from 'lodash'

export const initialState = {
  canvas: null,
  geo: [],
}

export const DesignerContext = React.createContext({
  state: undefined,
  dispatch: undefined,
})

export default DesignerContext

export const reducer = (state, action) => {
  switch (action.type) {
    case 'init': {
      return { ...state, canvas: action.payload }
    }

    case 'defaults': {
      return { ...state, defaults: action.payload }
    }

    default: {
      return state
    }
  }
}
