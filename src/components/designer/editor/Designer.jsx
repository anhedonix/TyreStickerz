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

const defaults = {
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

const Designer = () => {
  const classes = useStyles()
  const [triger, setTriger] = useState(true)

  const [stickersList, setStickersList] = useState([defaults])
  const createNewStickerCard = () => {
    setStickersList([
      { ...defaults, uid: stickersList.length },
      ...stickersList,
    ])
  }

  const updateStickersList = (action, uid, sticker) => {
    if (action === 'delete') {
      let temp = stickersList
      temp.map((e, i) => {
        if (e.uid === uid) {
          temp.splice(i, 1)
        }
      })
      setStickersList(temp)
    } else if (action === 'update') {
      let temp = stickersList
      temp.map((e, i) => {
        if (e.uid === uid) {
          temp[i] = sticker
        }
      })
      setStickersList(temp)
    }
    setTriger(!triger)
  }
  // console.log(stickersList, 'stickerList')
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
