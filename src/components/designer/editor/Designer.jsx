import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuid } from 'uuid'

import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'
import { types as textureTypes } from '../../../constants/Designer/textureTypes'
import StickerList from './StickerEditor/StickerCard/StickerList'
import * as CONTENT from '../../../constants/contentTypes'

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
    start: 45,
    length: 135,
    offsetU: 0,
    offsetV: 0,
    scaleU: 1,
    scaleV: 1,
    mirror: true,
    texture: {
      type: textureTypes.raster,
      path: 'Stickers/Graphics/PNYLAsMLcxeK9hwpSP4r/M_Performance.png',
    },
  }
}

const Designer = () => {
  const classes = useStyles()
  const [stickersList, setStickersList] = useState([
    { ...defaults(), index: 0 },
  ])
  const [wheel, setWheel] = useState()
  const [rim, setRim] = useState()
  const [accessories, setAccessories] = useState()
  const [sticker, setSticker] = useState()
  const [currentSticker, setCurrentSticker] = useState()

  useEffect(() => {
    axios.get('/api/defaults').then(i => {
      CONTENT.wheel.read(i.data.whl).then(j => {
        setWheel(j.tyre)
        setSticker(j.stickerMesh)
      })
      CONTENT.rims.read(i.data.rim).then(j => setRim(j.model))
      CONTENT.accessories.read(i.data.acc).then(j => setAccessories(j.model))
    })
  }, [])

  const createNewStickerCard = () => {
    setStickersList([
      { ...defaults(), index: stickersList.length },
      ...stickersList,
    ])
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
        <Canvas
          stickers={stickersList}
          currentSticker={currentSticker}
          rim={rim}
          wheel={wheel}
          accessories={accessories}
          stickerMesh={sticker}
        />
      </div>
      <StickerEditor
        stickers={stickersList}
        currentSticker={currentSticker}
        setCurrentSticker={setCurrentSticker}
        create={createNewStickerCard}
        update={updateStickersList}
      />
    </div>
  )
}

export default Designer
