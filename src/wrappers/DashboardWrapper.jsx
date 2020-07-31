import React, { useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import MainStateWrapper from './MainStateWrapper'
import DashContext, { initialState, dashReducer } from '../states/dashState'
import { useRouter } from 'next/router'

const DashStoryStateWrapper = props => {
  const [state, dispatch] = useReducer(dashReducer, initialState)
  const router = useRouter()
  const { path } = router.query

  useEffect(() => {
    dispatch({ type: 'setAll', payload: path })
  }, [path])

  return (
    <DashContext.Provider value={{ dashState: state, dashDispatch: dispatch }}>
      {props.children}
    </DashContext.Provider>
  )
}

DashStoryStateWrapper.propTypes = {
  children: PropTypes.any,
}

export default DashStoryStateWrapper
