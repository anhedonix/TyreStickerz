import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import StickerList from './StickerList'

const useStyles = makeStyles(theme => ({
  stickerCardPreview: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    margin: ' 0 0 4% 0',
    // position: 'relative',
  },
  image: {
    width: '100%',
    height: '10vh',
    // backgroundColor: 'red',

    backgroundImage: `url('/resources/stickers/M_Performance.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
      opacity: '.5',
    },
  },

  editMode: {
    display: 'flex',
    // flexDirection: 'Column',
    height: '30vh',
    width: '100%',
    margin: ' 0 0 4% 0',
  },
  dataCard: {
    width: '50%',
    height: '100%',
  },
}))

const StickerCardPreview = props => {
  const classes = useStyles()
  return (
    <Paper
      className={classes.stickerCardPreview}
      onClick={() => props.setEditMode(!props.editmode)}
    >
      <div className={classes.image} />
      <div className={classes.data}>S:45 E:135 U:0 V:0 SU:1 SV:1 M:T</div>
    </Paper>
  )
}

const StickerCardEdit = props => {
  const classes = useStyles()
  return (
    <Paper
      className={classes.editMode}
      onClick={() => {
        props.setEditMode(!props.editMode)
      }}
    >
      <StickerList />
      <div className={classes.dataCard}>
        <div className={classes.image} />
        <div className={classes.data}>
          <div>cover perpendicular:100</div>
          <div>cover degree:30</div>
        </div>
      </div>
    </Paper>
  )
}

const StickerCard = props => {
  return (
    <>
      {props.editMode ? (
        <StickerCardEdit
          setEditMode={props.setEditMode}
          editMode={props.editMode}
        />
      ) : (
        <StickerCardPreview
          setEditMode={props.setEditMode}
          editMode={props.editMode}
        />
      )}
    </>
  )
}
export default StickerCard
