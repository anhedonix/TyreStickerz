import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  slide: {
    minWidth: '200px',
    height: '250px',
    margin: '16px',
  },
}))

const Slide = () => {
  const classes = useStyles()

  return <Paper className={classes.slide} variant="outlined"></Paper>
}

export default Slide
