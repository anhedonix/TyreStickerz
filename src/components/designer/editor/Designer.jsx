import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuid } from 'uuid'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'

import DesignerMenuBar from './DesignerMenuBar/DesignerMenuBar'
import store from '../../../functions/store'
import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'
import { types as textureTypes } from '../../../constants/Designer/textureTypes'
// import StickerList from './StickerEditor/StickerCard/StickerList'
import * as CONTENT from '../../../constants/contentTypes'
import { MainContext } from '../../../states/mainState'
import { useContext } from 'react'
import AboutDialogue from './DesignerMenuBar/AboutDialog'
import customStickers from '../../../constants/contentTypes/customStickers'

const useStyles = makeStyles(theme => ({
  designerWrapper: state => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height:
      state.userData.type === 'DEV'
        ? `calc(100vh - 104px)`
        : `calc(100vh - 64px)`,
    // flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  }),
  designer: state => ({
    display: 'flex',
    width: '100vw',
    height:
      state.userData.type === 'DEV'
        ? `calc(100vh - 154px)`
        : ['ANON', 'CLIENT'].includes(state.userData.type)
        ? `calc(100vh - 64px)`
        : `calc(100vh - 114px)`,
    // flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  }),
  canvas: state => ({
    height:
      state.userData.type === 'DEV'
        ? `calc(100vh - 154px)`
        : ['ANON', 'CLIENT'].includes(state.userData.type)
        ? `calc(100vh - 64px)`
        : `calc(100vh - 114px)`,
    // flexGrow: '1',
    width: `84vw`,
    '& div': {
      overflow: 'visible',
    },
    '& canvas:focus': {
      outline: 'none',
    },
  }),
  title: {
    float: 'left',
    position: 'absolute',
    '& input': {
      fontSize: '2rem',
    },
  },
}))

const defaults = () => {
  const value = {
    uid: uuid(),
    start: 45,
    length: 90,
    offsetU: 0,
    offsetV: 0,
    scaleU: 1,
    scaleV: 1,
    mirror: false,
    texture: {
      path: 'Stickers/Graphics/uQYVTcmctCxIlh072FtY/WhiteWall.png',
    },
  }
  return value
}

const hydrateTexture = value => {
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
  const [currentStickerTemp, setCurrentStickerTemp] = useState()
  const [about, setAbout] = useState(false)

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
    console.log(stickersList)
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
      case 'reset': {
        stickersList.map(e => {
          if (e.uid === currentSticker.uid) {
            setCurrentSticker(e)
          }
        })
        break
      }
    }
  }

  return (
    <div className={classes.designerWrapper}>
      {!['ANON', 'CLIENT', null].includes(state.userData.type) && (
        <>
          <DesignerMenuBar
            functions={{
              New: () => setStickersList([]),
              Reset: () => {
                hydrateTexture(defaults()).then(val =>
                  setStickersList([{ ...val, index: 0 }])
                )
              },
              About: () => setAbout(true),
              Save: name => {
                console.log(stickersList)
                customStickers.create({
                  name: name,
                  data: [...stickersList],
                })
              },
            }}
          />
        </>
      )}
      <div className={classes.designer}>
        <div className={classes.canvas}>
          <Canvas
            rim={rim}
            wheel={wheel}
            accessories={accessories}
            stickerMesh={stickerMesh}
            stickers={stickersList}
            currentSticker={currentSticker}
            style={{ flexGrow: '1' }}
          />
        </div>
        <StickerEditor
          stickers={stickersList}
          currentSticker={currentSticker}
          currentStickerTemp={currentStickerTemp}
          setCurrentSticker={setCurrentSticker}
          setCurrentStickerTemp={setCurrentStickerTemp}
          create={createNewStickerCard}
          update={updateStickersList}
        />
      </div>
      <Dialog open={about} onClose={() => setAbout(false)}>
        <AboutDialogue />
      </Dialog>
    </div>
  )
}

export default Designer
