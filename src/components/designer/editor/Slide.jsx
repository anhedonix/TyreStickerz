import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  slide: selected => ({
    minWidth: '14vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // borderLeft: 'solid 2px #8888',
    backgroundColor: selected ? theme.palette.action.focus : null,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
      cursor: 'pointer',
    },
  }),
  slideAvatar: {
    height: '60%',
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

const Slide = ({ info, image, id, handleSelected, selected }) => {
  const classes = useStyles(selected === id)

  return (
    <div className={classes.slide} onClick={() => handleSelected(id)}>
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
