import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import Slide from './Slide'
import { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewport: {
    flexGrow: '1',
    // height: '60vh',

    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  slides: {
    display: 'flex',
    height: '40vh',
    maxHeight: '300px',
    minheight: '200px',
    width: '80%',
    overflow: 'scroll',
  },
  image: {
    height: '100%',
    width: '100',
    backgroundImage: `url(https://tyrewallstickers.com/wp-content/uploads/2019/08/tyre-2-1.png)`,
    backgroundSize: '100% 100%',
  },
  tyre: {
    margin: 'auto',
    // flexGrow: '1',
    backgroundImage: `url(https://tyrewallstickers.com/wp-content/uploads/2019/08/tyre-2-1.png)`,
    backgroundSize: '100%',
    alignSelf: 'center',
    width: '50vh',
    height: '50vh',
    backgroundPositionY: '-20px',
  },
  toggle: {
    alignSelf: 'flex-end',
    minWidth: '0',
    margin: '0 4vw 0 0',
    position: 'absolute',
  },
}))

const Designer = () => {
  const classes = useStyles()

  const data = {
    image: <div className={classes.image} />,
    info: {
      header: 'Header',
      description: 'description',
      meta1: 'meta1',
      meta2: 'meta2',
    },
  }

  let list = []

  const addItems = () => {
    let i
    for (i = 0; i < 100; i++) {
      list.push(data)
    }
    return list
  }
  addItems()

  const [view, setView] = React.useState('Full')

  const handleView = (event, newView) => {
    setView(newView)
  }

  return (
    <div className={classes.designer}>
      <div className={classes.viewport}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleView}
          aria-label="views"
          className={classes.toggle}
        >
          <ToggleButton value="Component" aria-label="left aligned">
            Component
          </ToggleButton>
          <ToggleButton value="Full " aria-label="centered">
            Full
          </ToggleButton>
        </ToggleButtonGroup>
        <div className={classes.tyre} />
      </div>

      <div className={classes.slides}>
        {list.map(value => (
          <Slide info={value.info} image={value.image} />
        ))}
      </div>
    </div>
  )
}

export default Designer
