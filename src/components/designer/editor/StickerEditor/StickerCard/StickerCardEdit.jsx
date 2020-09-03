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
  return (
    <div className={classes.stickerCardEdit}>
      <Typography id="discrete-slider" gutterBottom>
        Start
      </Typography>
      <Slider
        // defaultValue={Math.max(props.sticker.End, props.sticker.Start)}
        value={Math.min(props.sticker.End, props.sticker.Start)}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={360}
        onChange={(e, v) => {
          props.setSticker({
            ...props.sticker,
            Start: Math.min(props.sticker.End, v),
          })
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        End
      </Typography>
      <Slider
        defaultValue={props.sticker.End}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={360}
        onChange={e => {
          props.setSticker({
            ...props.sticker,
            End: Number(e.target.innerText),
          })
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Offset U
      </Typography>
      <Slider
        defaultValue={props.sticker.offsetU}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        marks
        min={0}
        max={1}
        onChange={e => {
          props.setSticker({
            ...props.sticker,
            offsetU: Number(e.target.innerText),
          })
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Offset V
      </Typography>
      <Slider
        defaultValue={props.sticker.offsetV}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        marks
        min={0}
        max={1}
        onChange={e => {
          props.setSticker({
            ...props.sticker,
            offsetV: Number(e.target.innerText),
          })
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Scale U
      </Typography>
      <Slider
        defaultValue={props.sticker.ScaleU}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        marks
        min={0}
        max={1}
        onChange={e => {
          props.setSticker({
            ...props.sticker,
            ScaleU: Number(e.target.innerText),
          })
          // console.log(e.target.innerText)
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Scale V
      </Typography>
      <Slider
        defaultValue={props.sticker.ScaleV}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.01}
        marks
        min={0}
        max={1}
        onChange={e => {
          props.setSticker({
            ...props.sticker,
            ScaleV: Number(e.target.innerText),
          })
        }}
      />
      <Button
        onClick={() => {
          props.setEditCard(!props.editCard)
          props.updateSticker('update', props.sticker.uid, props.sticker)
          // console.log(sticker)
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
