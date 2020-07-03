import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { v4 as uuid } from 'uuid'

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
    flexGrow: '0',
    width: '100vw',
    justifyContent: 'center',
    paddingBottom: '4rem',
  },
  visibleSlides: {
    overflow: 'hidden',
    // flexGrow: '1',
    // height: '30vh',
    width: '84vw',
  },
  slides: slideValue => ({
    display: 'flex',
    flexGrow: '1',
    // width: '80vw',
    height: '100%',
    // transform: `translateX(calc(100%*${-slideValue}))`,
    // transition: 'transform 1.5s',
  }),
  arrow: {
    height: '7vw',
    width: '7vw',
    '& svg': {
      height: '7vw',
      width: '7vw',
      opacity: '.7',
    },
  },
}))

const Designer = () => {
  const [page, setPage] = useState(0)
  const [list, setList] = useState([])
  const [pages, setPages] = useState()
  const [scrollSlice, setScrollSlice] = useState([])
  const [selected, setSelected] = useState()
  const classes = useStyles()

  const data = () => {
    return {
      image: '/Tyre.png',
      info: {
        header: 'Sticker',
        description: 'description',
        meta1: 'meta1',
        meta2: 'meta2',
        uuid: uuid().slice(0, 8),
      },
    }
  }

  useEffect(() => {
    let tempList = []

    for (let i = 0; i < 100; i++) {
      const currentData = data()

      tempList.push(currentData)
    }
    setList(tempList)
    setPage(0)
  }, [])

  useEffect(() => {
    setPages(Math.floor(list.length / 6))
    setScrollSlice(list.slice(0, 6))
  }, [list])

  useEffect(() => {
    setScrollSlice(list.slice(page * 6, page * 6 + 6))
  }, [page])

  const handleSelected = value => {
    setSelected(value)
  }

  const handleScrollLeft = () => {
    if (page != 0) {
      setPage(page - 1)
    }
  }

  const handleScrollRight = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  return (
    <div className={classes.designer}>
      <div className={classes.viewport}>
        <div className={classes.tyre} />
        <div className={classes.breadCrumbs}>
          <div style={{ fontSize: '32px', fontWeight: '500' }}>Mazda MX5</div>
          <div style={{ fontSize: '16px', opacity: '.6' }}>Tyre Stickers</div>
          {selected !== undefined && (
            <div style={{ fontSize: '24px' }}>Code: {selected}</div>
          )}
        </div>
      </div>
      <div className={classes.slidebar}>
        <div className={classes.arrow}>
          {page !== 0 && (
            <ArrowRightIcon
              style={{ transform: 'rotate(180deg)' }}
              onClick={() => handleScrollLeft()}
            />
          )}
        </div>
        <div className={classes.visibleSlides}>
          <div className={classes.slides}>
            {scrollSlice.map((value, i) => (
              <Slide
                info={value.info}
                image={value.image}
                key={i}
                id={value.info.uuid}
                order={i}
                handleSelected={handleSelected}
                selected={selected}
              />
            ))}
          </div>
        </div>
        <div className={classes.arrow}>
          {' '}
          {page !== pages && (
            <ArrowRightIcon
              className={classes.arrow}
              onClick={() => handleScrollRight()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Designer
