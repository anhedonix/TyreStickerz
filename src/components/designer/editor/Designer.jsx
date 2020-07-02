import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { v4 as uuid } from 'uuid'

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
  breadCrumbs: {
    margin: '0 0 2vh 10vw',
    fontSize: '20px',
    position: 'absolute',
    bottom: '0',
    left: '0',
  },
  viewport: {
    flexGrow: '1',
    height: '50vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-evenly',
  },
  toggle: {
    alignSelf: 'flex-end',
    minWidth: '0',
    margin: '0 2vw 0 0',
    // position: 'absolute',
  },
  tyre: {
    // flexGrow: '1',
    backgroundImage: `url('/Tyre.png')`,
    alignSelf: 'center',
    width: '50vh',
    height: '50vh',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  image: {
    height: '100%',
    width: '100%',
    backgroundImage: `url('/Tyre.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
  },
  slidebar: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    // height: '20vh',
    alignItems: 'center',
    flexGrow: '1',
    width: '100vw',
    justifyContent: 'center',
  },
  visibleSlides: {
    overflow: 'hidden',
    // flexGrow: '1',
    height: '30vh',
    width: '84vw',
  },
  slides: slideValue => ({
    display: 'flex',
    flexGrow: '1',
    // width: '80vw',
    height: '100%',
    transform: `translateX(calc(100%*${-slideValue}))`,
    transition: 'transform 1.5s',
  }),
  arrow: {
    height: '7vw',
    width: '7vw',
    opacity: '.7',
  },
}))

const Designer = () => {
  const [slideValue, setslideValue] = useState(0)

  const classes = useStyles(slideValue)

  const data = {
    image: <div className={classes.image} />,
    info: {
      header: 'Sticker',
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
        {/* <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleView}
          aria-label='views'
          className={classes.toggle}
        >
          <ToggleButton value='Component' aria-label='left aligned'>
            Component
          </ToggleButton>
          <ToggleButton value='Full ' aria-label='centered'>
            Full
          </ToggleButton>
        </ToggleButtonGroup> */}
        <div className={classes.tyre} />
        <div className={classes.breadCrumbs}>
          <div style={{ fontSize: '20px', fontWeight: '500' }}>Mazda MX5</div>
          <div style={{ fontSize: '16px', opacity: '.6' }}>Tyre Stickers</div>
          <div style={{ fontSize: '16px' }}>
            Code: {list[selected].info.header + selected}
          </div>
        </div>
      </div>
      <div className={classes.slidebar}>
        <ArrowRightIcon
          className={classes.arrow}
          style={{ transform: 'rotate(180deg)' }}
          onClick={() => setslideValue(slideValue === 0 ? 0 : slideValue - 1)}
        />
        <div className={classes.visibleSlides}>
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
                ((window.innerWidth / 100) * 14 * list.length) /
                  ((window.innerWidth / 100) * 80)
              ) -
                2 ===
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
