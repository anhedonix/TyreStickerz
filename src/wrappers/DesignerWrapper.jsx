import React, { useEffect, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { DesignerContext, reducer, initialState } from '../states/designer'
import _ from 'lodash'

const DesignerStateWrapper = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('/api/defaults').then(i => {
      dispatch({ type: 'defaults', payload: i.data })
    })
  }, [])

  return (
    <DesignerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DesignerContext.Provider>
  )
}

DesignerStateWrapper.propTypes = {
  children: PropTypes.any,
}

export default DesignerStateWrapper
