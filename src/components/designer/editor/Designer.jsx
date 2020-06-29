import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Slide from './Slide'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    alignItems: 'center',
  },
  viewport: {
    flexGrow: '1',
  },
  slides: {
    display: 'flex',
    height: '300px',
    width: '80%',
    justifyContent: 'center',
    overflow: 'scroll',
  },
}))

const Designer = () => {
  const classes = useStyles()
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className={classes.designer}>
      <div className={classes.viewport}></div>
      <div className={classes.slides}>
        {data.map(value => (
          <Slide>value</Slide>
        ))}
      </div>
    </div>
  )
}

export default Designer
