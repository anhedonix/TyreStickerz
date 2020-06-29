import React, { useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import MainStateWrapper from './MainStateWrapper.jsx'
import DevToolbar from '../components/admin/DashBoard/DevToolbar'
import Roboto from 'typeface-roboto'

const StoryStateWrapper = props => {
  return (
    <MainStateWrapper>
      <DevToolbar />
      {props.children}
    </MainStateWrapper>
  )
}

StoryStateWrapper.propTypes = {
  children: PropTypes.any,
}

export default StoryStateWrapper
