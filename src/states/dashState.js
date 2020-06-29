/**
 * Main Dashboard Wrapper maintaining all of the content states.
 */
import React from 'react'

export const initialState = {
  contentType: null,
  contentTypeLoading: true,
  contentID: null,
  contentIDLoading: true,
  contentIDSub: null,
  contentIDSubLoading: true,
  content: null,
  contentLoading: true,
}

const DashContext = React.createContext({
  dashState: undefined,
  dashDispatch: undefined,
})
export default DashContext

export const dashReducer = (state, action) => {
  switch (action.type) {
    case 'initialize': {
      return {
        ...action.payload,
      }
    }

    case 'setAll': {
      const data = action.payload
      if (action.payload) {
        switch (data.length) {
          case 0: {
            return {
              ...state,
              contentType: null,
              contentID: null,
              contentIDSub: null,
            }
          }
          case 1: {
            return {
              ...state,
              contentType: data[0],
              contentID: null,
              contentIDSub: null,
            }
          }
          case 2: {
            return {
              ...state,
              contentType: data[0],
              contentID: data[1],
              contentIDSub: null,
            }
          }
          case 3: {
            return {
              ...state,
              contentType: data[0],
              contentID: data[1],
              contentIDSub: data[2],
            }
          }
        }
      } else {
        return initialState
      }
    }

    case 'setContentType': {
      return {
        ...state,
        contentType: action.payload,
      }
    }

    case 'setContentTypeLoading': {
      return {
        ...state,
        contentTypeLoading: action.payload,
      }
    }

    case 'setContentID': {
      return {
        ...state,
        contentID: action.payload,
      }
    }

    case 'setContentIDLoading': {
      return {
        ...state,
        contentIDLoading: action.payload,
      }
    }

    case 'setContentIDSub': {
      return {
        ...state,
        contentIDSub: action.payload,
      }
    }

    case 'setContentIDSubLoading': {
      return {
        ...state,
        contentIDSubLoading: action.payload,
      }
    }

    case 'setContent': {
      return {
        ...state,
        content: action.payload,
      }
    }

    case 'setContentLoading': {
      return {
        ...state,
        contentLoading: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
