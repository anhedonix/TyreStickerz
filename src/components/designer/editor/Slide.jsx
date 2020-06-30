import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  slide: {
    minWidth: '200px',
    minHieght: '200px',
    height: '270px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderLeft: 'solid 2px #8888',
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
      cursor: 'pointer',
    },
  },
  slideAvatar: {
    height: '70%',
    width: '100%',
  },
  slideInfo: {
    height: '30%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
}))

const Slide = ({ info, image }) => {
  const classes = useStyles()

  return (
    <div className={classes.slide}>
      <div className={classes.slideAvatar}>{image}</div>
      <div className={classes.slideInfo}>
        <div className={classes.header}>{info.header}</div>
        <div className={classes.description}>{info.description}</div>
        <div className={classes.meta}>{info.meta1}</div>
        <div className={classes.meta}>{info.meta2}</div>
      </div>
    </div>
  )
}

export default Slide
