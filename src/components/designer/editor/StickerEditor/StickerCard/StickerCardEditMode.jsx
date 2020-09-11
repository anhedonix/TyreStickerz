import React, { useState } from 'react'
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

import TyrePreview from './TyrePreview'
import StickerList from './StickerList'

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
}))

const previewValues = { size: 300, thickness: 9 }

const StickerCardEditMode = props => {
  const sticker = props.data
  const classes = useStyles()
  const [listView, setListView] = useState(false)

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
      <div
        style={{
          transform: listView ? 'translate(410px)' : 'translate(0)',
          transition: 'transform 500ms',
        }}
      >
        <TyrePreview data={props.data} {...previewValues} />
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                props.update({ ...sticker, start: v })
              }}
            />
          </div>{' '}
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
                props.update({ ...sticker, length: v })
              }}
            />{' '}
          </div>{' '}
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
                props.update({ ...sticker, offsetU: v })
              }}
            />{' '}
          </div>{' '}
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
                props.update({ ...sticker, offsetV: v })
              }}
            />{' '}
          </div>{' '}
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
                props.update({ ...sticker, scaleU: v })
              }}
            />{' '}
          </div>{' '}
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
                props.update({ ...sticker, scaleV: v })
              }}
            />{' '}
          </div>{' '}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="discrete-slider" gutterBottom>
              Mirror
            </Typography>
            <Switch
              value={sticker.mirror}
              checked={sticker.mirror}
              onChange={(e, v) => {
                props.update({ ...sticker, mirror: v })
              }}
            />{' '}
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
            <Button startIcon={<SettingsBackupRestoreIcon />}>reset</Button>
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
      </div>
      <Slide
        in={listView}
        direction="right"
        timeout={{ enter: 500, exit: 500 }}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <StickerList setListView={setListView} />
        </div>
      </Slide>
    </div>
  )
}

export default StickerCardEditMode
