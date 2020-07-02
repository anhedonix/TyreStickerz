import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

import Slide from './Slide'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundImage: `url('/Banners/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  },
  viewport: {
    flexGrow: '1',
    height: '50vh',

    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  slides: slideValue => ({
    display: 'flex',
    height: '30vh',
    maxHeight: '300px',
    minheight: '200px',
    width: '80vw',
    transform: `translateX(calc(100%*${-slideValue}))`,
    transition: 'transform 1.5s',
  }),
  image: {
    height: '100%',
    width: '100%',
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
  slidebar: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    height: '7vw',
    width: '7vw',
    opacity: '.7',
  },
  scroll: {
    overflow: 'hidden',
  },
  breadCrumbs: {
    margin: '0 0 2vw 10vw',
    fontSize: '20px',
  },
}))

const Designer = () => {
  const [slideValue, setslideValue] = useState(0)

  const classes = useStyles(slideValue)

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

  const [selected, setSelected] = useState(0)
  const handleSelected = value => {
    setSelected(value)
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
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          className={classes.breadCrumbs}
        >
          <div>Car Model</div>
          <div>Rim Mdel</div>
          <div>{list[selected].info.header + selected}</div>
        </Breadcrumbs>
      </div>
      <div className={classes.slidebar}>
        <ArrowRightIcon
          className={classes.arrow}
          style={{ transform: 'rotate(180deg)' }}
          onClick={() => setslideValue(slideValue === 0 ? 0 : slideValue - 1)}
        />
        <div className={classes.scroll}>
          <div className={classes.slides}>
            {list.map((value, i) => (
              <Slide
                info={value.info}
                image={value.image}
                key={i}
                id={i}
                handleSelected={handleSelected}
                selected={selected}
              />
            ))}
          </div>
        </div>
        <ArrowRightIcon
          className={classes.arrow}
          onClick={() =>
            setslideValue(
              Math.ceil(
                (200 * list.length) / ((window.innerWidth / 100) * 80)
              ) -
                1 ===
                slideValue
                ? slideValue
                : slideValue + 1
            )
          }
        />
      </div>
    </div>
  )
}

export default Designer
