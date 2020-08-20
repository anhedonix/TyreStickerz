import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    width: '100vw',
    height: `calc(100vh - 104px)`,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
    // overflow: 'hidden',
  },
  canvas: editMode => ({
    width: editMode ? '60vw' : '80vw',
    height: `calc(100vh - 104px)`,
  }),
}))

const Designer = () => {
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles(editMode)
  console.log(editMode)
  return (
    <div className={classes.designer}>
      <div className={classes.canvas}>
        <Canvas />
      </div>
      <StickerEditor setEditMode={setEditMode} editMode={editMode} />
    </div>
  )
}

export default Designer
