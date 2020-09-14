import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuid } from 'uuid'

import store from '../../../functions/store'
import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'
import { types as textureTypes } from '../../../constants/Designer/textureTypes'
// import StickerList from './StickerEditor/StickerCard/StickerList'
import * as CONTENT from '../../../constants/contentTypes'
import { MainContext } from '../../../states/mainState'
import { useContext } from 'react'

const useStyles = makeStyles(theme => ({
  designer: state => ({
    display: 'flex',
    width: '100vw',
    height:
      state.userData.type === 'DEV'
        ? `calc(100vh - 104px)`
        : `calc(100vh - 64px)`,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  }),
  canvas: editMode => ({
    height: `calc(100vh - 104px)`,
    width: `84vw`,
    '& div': {
      overflow: 'visible',
    },
    '& canvas:focus': {
      outline: 'none',
    },
  }),
}))

const defaults = () => {
  const value = {
    uid: uuid(),
    proportional: false,
    start: 45,
    length: 90,
    offsetU: 0,
    offsetV: 0,
    scaleU: 1,
    scaleV: 1,
    mirror: false,
    texture: {
      type: textureTypes.raster,
      path: 'Stickers/Graphics/0c231838-96c9-4a90-bff7-efd3ede4a763.png',
    },
  }
  return value
}

const hydrateTexture = value => {
  if (value.texture.type === textureTypes.raster) {
    return new Promise((resolve, reject) => {
      store
        .getFileUrl(value.texture.path)
        .then(texture_path =>
          resolve({
            ...value,
            texture: { ...value.texture, file: texture_path },
          })
        )
        .catch(err => reject(err))
    })
  } else {
    return resolve(value)
  }
}

const Designer = () => {
  const { state, dispatch } = useContext(MainContext)
  const classes = useStyles(state)
  const [stickersList, setStickersList] = useState([])
  const [wheel, setWheel] = useState()
  const [rim, setRim] = useState()
  const [accessories, setAccessories] = useState()
  const [stickerMesh, setStickerMesh] = useState()
  const [currentSticker, setCurrentSticker] = useState()

  useEffect(() => {
    axios.get('/api/defaults').then(i => {
      CONTENT.wheel.read(i.data.whl).then(j => {
        setWheel(j.tyre)
        store.getFileUrl(j.stickerMesh).then(e => setStickerMesh(e))
      })
      CONTENT.rims.read(i.data.rim).then(j => setRim(j.model))
      CONTENT.accessories.read(i.data.acc).then(j => setAccessories(j.model))
    })
    hydrateTexture(defaults()).then(val =>
      setStickersList([{ ...val, index: 0 }])
    )
  }, [])

  const createNewStickerCard = () => {
    hydrateTexture(defaults()).then(val =>
      setStickersList([{ ...val, index: stickersList.length }, ...stickersList])
    )
  }

  const updateStickersList = (action, sticker = null) => {
    let temp = [...stickersList]
    switch (action) {
      case 'delete': {
        temp.map((e, i) => {
          if (e.uid === sticker.uid) {
            temp.splice(i, 1)
          }
        })
        setStickersList(temp)
        break
      }
      case 'update': {
        temp.map((e, i) => {
          if (e.uid === currentSticker.uid) {
            temp.splice(i, 1, { ...currentSticker, index: i })
            setCurrentSticker()
          }
        })

        setStickersList(temp)
        break
      }
      case 'cancel': {
        setCurrentSticker()
        break
      }
      case 'duplicate': {
        setStickersList([{ ...currentSticker, uid: uuid() }, ...temp])
        setCurrentSticker()
        break
      }
    }
  }
  // console.log(stickersList)
  return (
    <div className={classes.designer}>
      <div className={classes.canvas}>
        <Canvas
          rim={rim}
          wheel={wheel}
          accessories={accessories}
          stickerMesh={stickerMesh}
          stickers={stickersList}
          currentSticker={currentSticker}
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
