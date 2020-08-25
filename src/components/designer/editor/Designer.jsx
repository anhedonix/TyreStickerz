import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'
import { types as textureTypes } from '../../../constants/Designer/textureTypes'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    width: '100vw',
    height: `calc(100vh - 104px)`,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  },
  canvas: editMode => ({
    // width: '80vw',
    height: `calc(100vh - 104px)`,
    width: `84vw`,
    // '& canvas': {
    //    transition: 'width 100ms',
    // },
    '& div': {
      overflow: 'visible',
    },
  }),
}))

const defaults = {
  uid: 0,
  proportional: false,
  Start: 45,
  End: 135,
  offsetU: 0,
  offsetV: 0,
  ScaleU: 1,
  ScaleV: 1,
  Mirror: false,
  Texture: {
    type: textureTypes.raster,
    path: '/resources/stickers/M_Performance.png',
  },
}

const Designer = () => {
  const classes = useStyles()

  const [stickersList, setStickersList] = useState([defaults])
  const createNewStickerCard = () => {
    setStickersList([
      { ...defaults, uid: stickersList.length },
      ...stickersList,
    ])
  }

  return (
    <div className={classes.designer}>
      <div className={classes.canvas}>
        <Canvas stickers={stickersList} />
      </div>
      <StickerEditor stickers={stickersList} createNew={createNewStickerCard} />
    </div>
  )
}

export default Designer
