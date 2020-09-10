import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import TyrePreview from './TyrePreview'

const useStyles = makeStyles(theme => ({}))

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
        transform: listView ? 'translate(410px)' : 'translate(0)',
        transition: 'transform 500ms',
      }}
    >
      <TyrePreview data={props.data} {...previewValues} />
      <Tooltip title="change sticker">
        <div
          style={{
            backgroundColor: 'black',
            padding: '8px',
            margin: '4px',
            borderRadius: '.5rem',
          }}
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
          onChange={(e, v) => {
            props.update({ ...sticker, start: v })
          }}
        />
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
          onChange={(e, v) => {
            props.update({ ...sticker, length: v })
          }}
        />
        <Typography id="discrete-slider" gutterBottom>
          Offset U
        </Typography>
        <Slider
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
        />
        <Typography id="discrete-slider" gutterBottom>
          Offset V
        </Typography>
        <Slider
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
        />
        <Typography id="discrete-slider" gutterBottom>
          Scale U
        </Typography>
        <Slider
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
        />
        <Typography id="discrete-slider" gutterBottom>
          Scale V
        </Typography>
        <Slider
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
        />
        <Typography id="discrete-slider" gutterBottom>
          Mirror
        </Typography>
        <Switch
          value={sticker.mirror}
          checked={sticker.mirror}
          onChange={(e, v) => {
            props.update({ ...sticker, mirror: v })
          }}
        />
        <div style={{ display: 'flex' }}>
          <Tooltip title="discard changes">
            <Button
              onClick={() => {
                props.apply('cancel')
              }}
              style={{ width: '100%' }}
              variant="contained"
            >
              cancel
            </Button>
          </Tooltip>
          <Tooltip title="save changes">
            <Button
              onClick={() => {
                props.apply('update')
              }}
              style={{ width: '100%' }}
              color="primary"
              variant="contained"
            >
              apply
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StickerCardEditMode
