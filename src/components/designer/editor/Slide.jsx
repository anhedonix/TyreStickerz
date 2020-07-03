import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { min } from 'moment'

const useStyles = makeStyles(theme => ({
  slide: selected => ({
    minWidth: '14vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    // borderLeft: 'solid 2px #8888',
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

const Slide = ({ info, image, id, handleSelected, selected }) => {
  const classes = useStyles(selected === id)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const display = useRef()

  const setSize = () => {
    const value = display.current.clientWidth

    setHeight(value)
    setWidth(value)
  }

  useEffect(() => {
    setSize()
    window.addEventListener('resize', setSize)
    return () => window.removeEventListener('resize', setSize)
  }, [])

  return (
    <div
      className={classes.slide}
      onClick={() => handleSelected(id)}
      style={{ maxHeight: height + 150 }}
    >
      <div
        ref={display}
        className={classes.displayWrapper}
        style={{ maxHeight: height, display: 'block' }}
      >
        <img
          className={classes.slideAvatar}
          src={image}
          height={height}
          width={width}
        ></img>
      </div>
      <div className={classes.slideInfo}>
        <div className={classes.header}>{info.header}</div>
        <div className={classes.description}>{info.description}</div>
        <div className={classes.meta}>{info.uuid}</div>
        <div className={classes.meta}>{info.meta2}</div>
      </div>
    </div>
  )
}

export default Slide
