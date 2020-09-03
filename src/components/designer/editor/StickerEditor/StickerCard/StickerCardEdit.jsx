import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  stickerCardEdit: {
    width: '340px',
    minHeight: '300px',
    padding: '16px',
  },
}))

const StickerCardEdit = props => {
  const classes = useStyles()
  const sticker = props.data
  return (
    <div className={classes.stickerCardEdit}>
      <Typography id="discrete-slider" gutterBottom>
        Start
      </Typography>
      <Slider
        value={props.data.start}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2.5}
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
        step={0.01}
        marks
        min={0}
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
        step={0.01}
        marks
        min={0}
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
        step={0.01}
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
        step={0.01}
        marks
        min={0}
        max={1}
        onChange={(e, v) => {
          props.update({ ...sticker, scaleV: v })
        }}
      />
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
  )
}
export default StickerCardEdit
