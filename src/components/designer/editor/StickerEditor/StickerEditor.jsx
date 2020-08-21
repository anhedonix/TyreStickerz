import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import StickerCard from './StickerCard'

const useStyles = makeStyles(theme => ({
  stickerEditor: editMode => ({
    height: `calc(100vh - 104px)`,
    width: editMode ? '40vw' : '20vw',
    transition: 'width 500ms',
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
  const defaults = [
    { sticker: '/resources/stickers/M_Performance.png' },
    { startingDegree: 45 },
    { endingDegree: 135 },
    { offsetU: 0 },
    { offsetV: 0 },
    { scaleU: 1 },
    { scaleV: 1 },
    { Mirror: false },
  ]
  const [stickersList, updateStickersList] = useState([defaults])

  const createNewStickerCard = () => {
    const tempStickersList = stickersList
    updateStickersList(tempStickersList.concat([defaults]))
  }
  return (
    <div
      className={classes.stickerEditor}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StickerCard_1
        setEditMode={props.setEditMode}
        editMode={props.editMode}
      <AddCircleIcon
        className={classes.addStickerCard}
        onClick={createNewStickerCard}
      />
    </div>
  )
}

export default StickerEditor
