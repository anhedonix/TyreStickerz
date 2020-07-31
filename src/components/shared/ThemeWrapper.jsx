import React, { useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0091ea',
    },
  },
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0091ea',
    },
  },
})

const ThemeWrapper = props => {
  const [dark, setDark] = useState(true)
  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <FormControlLabel
        control={
          <Switch
            checked={dark}
            onChange={() => setDark(!dark)}
            name="checkedA"
          />
        }
        label="Dark Theme"
      />
      {props.children}
    </ThemeProvider>
  )
}

export default ThemeWrapper
