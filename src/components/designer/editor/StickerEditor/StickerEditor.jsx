import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import StickerCard_1 from './StickerCard_1'

const useStyles = makeStyles(theme => ({
  stickerEditor: editMode => ({
    height: `calc(100vh - 104px)`,
    width: editMode ? '40vw' : '20vw',
    transition: 'width 500ms',
  }),
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
  return (
    <div
      className={classes.stickerEditor}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StickerCard_1
        setEditMode={props.setEditMode}
        editMode={props.editMode}
      />
    </div>
  )
}

export default StickerEditor
