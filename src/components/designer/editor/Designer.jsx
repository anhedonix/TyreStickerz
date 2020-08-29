import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuid } from 'uuid'

import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'
import { types as textureTypes } from '../../../constants/Designer/textureTypes'
import StickerList from './StickerEditor/StickerCard/StickerList'

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
    height: `calc(100vh - 104px)`,
    width: `84vw`,
    '& div': {
      overflow: 'visible',
    },
  }),
}))

const defaults = () => {
  return {
    uid: uuid(),
    proportional: false,
    Start: 45,
    End: 135,
    offsetU: 0,
    offsetV: 0,
    ScaleU: 1,
    ScaleV: 1,
    Mirror: true,
    Texture: {
      type: textureTypes.raster,
      path: 'Stickers/Graphics/PNYLAsMLcxeK9hwpSP4r/M_Performance.png',
    },
  }
}

const Designer = () => {
  const classes = useStyles()
  const [stickersList, setStickersList] = useState([defaults()])

  const createNewStickerCard = () => {
    setStickersList([{ ...defaults() }, ...stickersList])
  }

  const updateStickersList = (action, sticker) => {
    let temp = [...stickersList]
    if (action === 'delete') {
      temp.map((e, i) => {
        if (e.uid === sticker.uid) {
          temp.splice(i, 1)
        }
      })
      setStickersList(temp)
    } else if (action === 'update') {
      temp.map((e, i) => {
        if (e.uid === sticker.uid) {
          temp.splice(i, 1, sticker)
        }
      })
      setStickersList(temp)
    }
  }

  return (
    <div className={classes.designer}>
      <div className={classes.canvas}>
        <Canvas stickers={stickersList} />
      </div>
      <StickerEditor
        stickers={stickersList}
        createNew={createNewStickerCard}
        updateStickersList={updateStickersList}
      />
    </div>
  )
}

export default Designer
