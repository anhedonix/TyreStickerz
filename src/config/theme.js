import React, { useState, useEffect, useContext } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { MainContext } from '../states/mainState.js'
import packageJson from '../../package.json'

const color_primary = packageJson.variables.primaryColor
const color_secondary = packageJson.variables.secondaryColor
const ui_dense = false

const themes = {
  light: createMuiTheme({
    palette: {
      primary: {
        main: color_primary,
      },
      secondary: {
        main: color_secondary,
      },
      type: 'light',
      dense: ui_dense,
    },
  }),
  dark: createMuiTheme({
    palette: {
      primary: {
        main: color_primary,
      },
      secondary: {
        main: color_secondary,
      },
      type: 'dark',
      dense: ui_dense,
    },
  }),
}

const ThemeContainer = props => {
  const { state, dispatch } = useContext(MainContext)

  return (
    <ThemeProvider
      {...props}
      theme={state.userData.darkUI ? themes.dark : themes.light}
    >
      {props.children}
    </ThemeProvider>
  )
}

export default ThemeContainer
