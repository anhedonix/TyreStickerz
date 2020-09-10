import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import TyrePreview from './TyrePreview'

const useStyles = makeStyles(theme => ({}))

const previewValues = { size: 300, thickness: 9 }

const StickerCardEditMode = props => {
  const sticker = props.data
  const classes = useStyles()

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
      <TyrePreview data={props.data} {...previewValues} />
      <div
        style={{
          backgroundColor: 'black',
          padding: '8px',
          margin: '4px',
          borderRadius: '.5rem',
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
          <Button
            onClick={() => {
              props.apply('cancel')
            }}
            style={{ width: '100%' }}
            variant="contained"
          >
            cancel
          </Button>
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
        </div>
      </div>
    </div>
  )
}

export default StickerCardEditMode
