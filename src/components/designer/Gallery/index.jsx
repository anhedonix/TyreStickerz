import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuid } from 'uuid'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'

import store from '../../../functions/store'
import Canvas from '../editor/Canvas/index'
// import StickerList from './StickerEditor/StickerCard/StickerList'
import * as CONTENT from '../../../constants/contentTypes'
import { MainContext } from '../../../states/mainState'
import { useContext } from 'react'
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
    // backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  }),
  designer: state => ({
    display: 'flex',
    width: '100vw',
    height:
      state.userData.type === 'DEV'
        ? `calc(100vh - 154px)`
        : `calc(100vh - 64px)`,
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  }),
  canvas: state => ({
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // flexGrow: '1',
    width: `280px`,
    margin: '1rem',
    '& div': {
      overflow: 'visible',
    },
    '& canvas': {
      // width: '300px',
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
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const Designer = () => {
  const { state, dispatch } = useContext(MainContext)
  const classes = useStyles(state)
  const [data, setData] = useState([])
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
    customStickers.read().then(cdata => {
      setData(cdata)
    })
  }, [])

  return (
    <div className={classes.designer}>
      {data.map(e => (
        <Paper className={classes.canvas}>
          <Canvas
            rim={rim}
            wheel={wheel}
            accessories={accessories}
            stickerMesh={stickerMesh}
            stickers={e.data}
            currentSticker={currentSticker}
            style={{ flexGrow: '1' }}
          />
          <div className={classes.button}>
            <a href={`/design/${e.uid}`} target="_blank">
              <Button startIcon={<VisibilityIcon />}>View</Button>
            </a>
            <Link href={`/editor/${e.uid}`}>
              <Button startIcon={<EditIcon />}>Edit</Button>
            </Link>
          </div>
        </Paper>
      ))}
    </div>
  )
}

export default Designer
