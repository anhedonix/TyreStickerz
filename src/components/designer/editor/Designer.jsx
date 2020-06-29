import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'red',
    flexGrow: '1',
  },
  viewport: {
    flexGrow: '1',
    backgroundColor: 'green',
  },
  slide: {
    height: '300px',
    width: '100%',
    backgroundColor: 'blue',
  },
}))

const Designer = () => {
  const classes = useStyles()

  return (
    <div className={classes.designer}>
      <div className={classes.viewport}></div>
      <div className={classes.slide}></div>
    </div>
  )
}

export default Designer
