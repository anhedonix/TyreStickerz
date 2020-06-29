import CssBaseline from '@material-ui/core/CssBaseline'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'

import { MainContext, reducer, initialState } from '../states/mainState'
import Loading from '../components/shared/Loading/Loading'
import Messages from './pop-msg/message'
import ReAuth from '../components/shared/User/ReAuth/ReAuth'
import ThemeContainer from '../config/theme'
import * as content from '../constants/contentTypes'
import firebase from '../firebase/firebase'

const MainStateWrapper = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'loading', payload: true })
    const authListner = firebase.auth().onAuthStateChanged(e => {
      dispatch({
        type: 'authChange',
        payload: e,
      })
      if (e) {
        content.user.currentUser().readSnap(d => {
          dispatch({
            type: 'authData',
            payload: d,
          })
        }, e.uid)
        dispatch({ type: 'loading', payload: false })
      } else {
        dispatch({
          type: 'authData',
          payload: null,
        })
        dispatch({ type: 'loading', payload: false })
      }
    })
    return authListner
  }, [])

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <ThemeContainer>
        <CssBaseline />
        {!state.loading.primary ? props.children : <Loading />}
        <Messages />
        <ReAuth />
      </ThemeContainer>
    </MainContext.Provider>
  )
}

MainStateWrapper.propTypes = {
  children: PropTypes.any,
}

export default MainStateWrapper
