import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import StickerCard from './StickerCard'

const useStyles = makeStyles(theme => ({
  stickerEditor: editMode => ({
    height: `calc(100vh - 104px)`,
    width: editMode ? '40vw' : '20vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    // transition: 'width 500ms',
  }),
  addStickerCard: {
    width: '2vw',
    height: '2vw',
    // color: '#8888',
    opacity: '.5',
    margin: '8px',
  },
}))

const StickerEditor = props => {
  const classes = useStyles(props.editMode)
  const defaults = {
    Sticker: '/resources/stickers/M_Performance.png',
    StartingDegree: 45,
    EndingDegree: 135,
    offsetU: 0,
    offsetV: 0,
    ScaleU: 1,
    ScaleV: 1,
    Mirror: false,
  }
  const [stickersList, updateStickersList] = useState([defaults])
  const createNewStickerCard = () => {
    const tempStickersList = stickersList
    updateStickersList(tempStickersList.concat(defaults))
  }
  // console.log(stickersList)
  return (
    <div className={classes.stickerEditor}>
      <AddCircleIcon
        className={classes.addStickerCard}
        onClick={createNewStickerCard}
      />
      {stickersList.map(e => (
        <StickerCard
          setEditMode={props.setEditMode}
          editMode={props.editMode}
          data={e}
        />
      ))}
    </div>
  )
}

export default StickerEditor
