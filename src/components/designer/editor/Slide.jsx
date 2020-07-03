import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSpring, animated } from 'react-spring'
import Loader from '../../shared/Loading/Loading'

const useStyles = makeStyles(theme => ({
  slide: selected => ({
    minWidth: '14vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    // borderLeft: 'solid 2px #8888',

    position: 'relative',
    backgroundColor: selected ? theme.palette.action.focus : null,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
      cursor: 'pointer',
    },
  }),
  slideAvatar: {
    // height: '60%',
    // maxWidth: '100%',
    margin: 'auto auto 0 auto',
    display: 'block',
  },
  slideInfo: {
    // height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: '16px',
    fontWeight: '500',
  },
  description: {
    fontSize: '14px',
    fontWeight: '300',
  },
  meta: {
    fontSize: '14px',
    fontWeight: '401',
  },
  displayWrapper: {
    flexGrow: '1',
  },
}))

const Slide = ({ info, image, id, handleSelected, selected, order, page }) => {
  const classes = useStyles(selected === id)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [loading, setLoading] = useState(true)
  const [cPage, setCPage] = useState(page)
  const display = useRef()
  const springConfig = { mass: 2, friction: 26, tension: 170 }
  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: springConfig,
    reset: cPage !== page,
    delay: order * 100,
  })

  const setSize = () => {
    if (display.current) {
      const value = display.current.clientWidth

      setHeight(value)
      setWidth(value)
    }
  }
  useEffect(() => {
    setCPage(page)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, order * 200)
  }, [page])

  useEffect(() => {
    setSize()
    setTimeout(() => {
      setLoading(false)
    }, order * 200)
    window.addEventListener('resize', setSize)
    return () => window.removeEventListener('resize', setSize)
  }, [])

  return (
    <animated.div
      className={classes.slide}
      onClick={() => handleSelected(id)}
      style={{ ...springProps, maxHeight: height + 150 }}
    >
      <div
        ref={display}
        className={classes.displayWrapper}
        style={{ maxHeight: height, display: 'block' }}
      >
        {loading ? (
          <Loader />
        ) : (
          <img
            className={classes.slideAvatar}
            src={image}
            height={height}
            width={width}
          ></img>
        )}
      </div>
      <div className={classes.slideInfo}>
        <div className={classes.header}>{info.header}</div>
        <div className={classes.description}>{info.description}</div>
        <div className={classes.meta}>{info.uuid}</div>
        <div className={classes.meta}>{info.meta2}</div>
      </div>
    </animated.div>
  )
}

export default Slide
