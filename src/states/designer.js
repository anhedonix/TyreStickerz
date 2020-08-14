import React from 'react'
import _ from 'lodash'
import store from '../functions/store'

export const initialState = {
  canvas: null,
  geo: [],
  env: {
    px: '/resources/cubemaps/px.hdr',
    nx: '/resources/cubemaps/nx.hdr',
    py: '/resources/cubemaps/py.hdr',
    ny: '/resources/cubemaps/ny.hdr',
    pz: '/resources/cubemaps/pz.hdr',
    nz: '/resources/cubemaps/nz.hdr',
  },
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

    case 'setEnv': {
      const maps = ['px', 'nx', 'py', 'ny', 'pz', 'nz']
      const out = {}
      maps.map(el =>
        store.getFileUrl(action.payload[el]).then(p => (out[el] = p))
      )
      return { ...state, env: out }
    }

    default: {
      return state
    }
  }
}
