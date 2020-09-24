import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Slide from '@material-ui/core/Slide'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Zoom from '@material-ui/core/Zoom'
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate'
import { Scrollbars } from 'react-custom-scrollbars'

import TyrePreview from './TyrePreview'
import StickerList from './StickerList'
import { types as textureTypes } from '../../../../../constants/Designer/textureTypes'

const useStyles = makeStyles(theme => ({
  stickerBack: {
    backgroundColor: 'black',
    padding: '8px',
    margin: '4px',
    borderRadius: '.5rem',
    opacity: '1',
    '&:hover': {
      opacity: '.5',
    },
  },
  colors: {
    minHeight: '100px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorSwatch: {
    minWidth: '0',
    width: '30px',
    height: '30px',
    borderRadius: '40px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
    transition: 'all 200ms',
    '&:hover': {
      opacity: '0.8',
    },
  },
  colorSwatchActive: {
    minWidth: '0',
    width: '60px',
    height: '60px',
    borderRadius: '40px',
    transition: 'all 200ms',
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    border: '2px solid #000',
    '&:hover': {
      opacity: '0.8',
    },
  },
}))

export const colors = [
  { id: 0, color: '#c5cdd5', swatch: '#e3e7eb', name: 'White' },
  { id: 1, color: '#cd8617', swatch: '#e7bf57', name: 'Yellow' },
  { id: 2, color: '#ba3f0e', swatch: '#dd8846', name: 'Orange' },
  { id: 3, color: '#6d080b', swatch: '#ae353d', name: 'Red' },
  { id: 4, color: '#186d0e', swatch: '#58ae46', name: 'Green' },
  { id: 5, color: '#0a439a', swatch: '#3c8ccb', name: 'Blue' },
]

const StickerCardEditMode = props => {
  const [previewValues, setPreviewValues] = useState({
    size: 300,
    thickness: 9,
  })
  const sticker = props.data
  const updateSticker = (file, path) => {
    props.update({
      ...sticker,
      texture: {
        file: file,
        path: path,
      },
    })
    props.liveUpdate({
      ...sticker,
      texture: {
        file: file,
        path: path,
      },
    })
  }
  const classes = useStyles()
  const [listView, setListView] = useState(false)

  useEffect(() => {
    setPreviewValues({ ...previewValues, size: window.innerHeight / 4 })
    console.log(window.innerHeight)
  }, [])

  const handleScroll = values => {
    const shadowTop_ = shadowTop.current
    const shadowBottom_ = shadowBottom.current
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    css(shadowTop_, { opacity: shadowTopOpacity })
    css(shadowBottom_, { opacity: shadowBottomOpacity })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: `${previewValues.size}`,
        flexGrow: '1',
        justifyContent: 'flex-start',
      }}
    >
      <Slide
        in={listView}
        direction="right"
        timeout={{ enter: 500, exit: 500 }}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <StickerList
            setListView={setListView}
            updateSticker={updateSticker}
          />
        </div>
      </Slide>
      <div
        style={{
          transform: listView ? 'translate(410px)' : 'translate(0)',
          transition: 'transform 500ms',
        }}
      >
        <TyrePreview data={props.data} {...previewValues} />
        <Scrollbars style={{ minHeight: '50vh' }}>
          <Button
            startIcon={<ControlPointDuplicateIcon />}
            onClick={() => {
              props.apply('duplicate')
            }}
          >
            Duplicate
          </Button>
          <Tooltip
            title="change sticker"
            style={{ pointerEvents: 'none !Important' }}
            TransitionComponent={Zoom}
            placement="left"
          >
            <div
              className={classes.stickerBack}
              onClick={() => {
                setListView(true)
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${props.data.texture.file})`,
                  width: '100%',
                  height: '60px',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </Tooltip>
          <div className={classes.stickerCardEdit}>
            <div className={classes.colors}>
              {colors.map(e => (
                <Button
                  style={{ backgroundColor: e.swatch }}
                  className={
                    props.data.tint == e.id
                      ? classes.colorSwatchActive
                      : classes.colorSwatch
                  }
                  onClick={() => {
                    props.liveUpdate({ ...sticker, tint: e.id })
                    props.update({ ...sticker, tint: e.id })
                  }}
                  key={e.id}
                />
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography id="discrete-slider" gutterBottom>
                Start
              </Typography>
              <Slider
                value={props.data.start}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={3}
                marks
                min={0}
                max={360}
                style={{ width: '80%', marginRight: '8px' }}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, start: v })
                }}
                onChangeCommitted={(e, v) => {
                  props.update({ ...sticker, start: v })
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="discrete-slider" gutterBottom>
                Length
              </Typography>
              <Slider
                value={sticker.length}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={3}
                marks
                min={0}
                max={360}
                style={{ width: '80%', marginRight: '8px' }}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, length: v })
                }}
                onChangeCommitted={(e, v) => {
                  props.update({ ...sticker, length: v })
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="discrete-slider" gutterBottom>
                Offset U
              </Typography>
              <Slider
                style={{ width: '80%', marginRight: '8px' }}
                value={sticker.offsetU}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={-1}
                max={1}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, offsetU: v })
                }}
                onChangeCommitted={(e, v) => {
                  props.update({ ...sticker, offsetU: v })
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="discrete-slider" gutterBottom>
                Offset V
              </Typography>
              <Slider
                style={{ width: '80%', marginRight: '8px' }}
                value={sticker.offsetV}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={-1}
                max={1}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, offsetV: v })
                }}
                onChangeCommitted={(e, v) => {
                  props.update({ ...sticker, offsetV: v })
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="discrete-slider" gutterBottom>
                Scale U
              </Typography>
              <Slider
                style={{ width: '80%', marginRight: '8px' }}
                value={sticker.scaleU}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={1}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, scaleU: v })
                }}
                onChangeCommitted={(e, v) => {
                  props.update({ ...sticker, scaleU: v })
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="discrete-slider" gutterBottom>
                Scale V
              </Typography>
              <Slider
                style={{ width: '80%', marginRight: '8px' }}
                value={sticker.scaleV}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={1}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, scaleV: v })
                }}
                onChangeCommitted={(e, v) => {
                  props.update({ ...sticker, scaleV: v })
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography id="discrete-slider" gutterBottom>
                Mirror
              </Typography>
              <Switch
                value={sticker.mirror}
                checked={sticker.mirror}
                onChange={(e, v) => {
                  props.liveUpdate({ ...sticker, mirror: v })
                  props.update({ ...sticker, mirror: v })
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ButtonGroup
              // color="primary"
              aria-label="outlined primary button group"
              style={{ alignSelf: 'center', margin: '16px' }}
            >
              <Button
                startIcon={<SettingsBackupRestoreIcon />}
                onClick={() => {
                  props.apply('reset')
                }}
              >
                reset
              </Button>

              <Button
                startIcon={<CancelIcon />}
                onClick={() => {
                  props.apply('cancel')
                }}
              >
                cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  props.apply('update')
                }}
              >
                Apply
              </Button>
            </ButtonGroup>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default StickerCardEditMode
