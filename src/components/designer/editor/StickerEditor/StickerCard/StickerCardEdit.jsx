import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  stickerCardEdit: {
    width: '340px',
    minHeight: '300px',
    padding: '16px',
  },
}))

const StickerCardEdit = props => {
  let sticker = props.data
  const classes = useStyles()
  return (
    <div className={classes.stickerCardEdit}>
      <Typography id="discrete-slider" gutterBottom>
        Start
      </Typography>
      <Slider
        defaultValue={props.data.Start}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={360}
        onChange={e => {
          sticker.Start = Number(e.target.innerText)
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        End
      </Typography>
      <Slider
        defaultValue={props.data.End}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={360}
        onChange={e => {
          sticker.End = Number(e.target.innerText)
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Offset U
      </Typography>
      <Slider
        defaultValue={props.data.offsetU}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={1}
        onChange={e => {
          sticker.offsetU = Number(e.target.innerText)
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Offset V
      </Typography>
      <Slider
        defaultValue={props.data.offsetV}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={1}
        onChange={e => {
          sticker.offsetV = Number(e.target.innerText)
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Scale U
      </Typography>
      <Slider
        defaultValue={props.data.ScaleU}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={1}
        onChange={e => {
          sticker.ScaleU = Number(e.target.innerText)
          console.log(e.target.innerText)
        }}
      />
      <Typography id="discrete-slider" gutterBottom>
        Scale V
      </Typography>
      <Slider
        defaultValue={props.data.ScaleV}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={1}
        onChange={e => {
          sticker.ScaleV = Number(e.target.innerText)
        }}
      />
      <Button
        onClick={() => {
          props.setEditCard(!props.editCard)
          props.updateSticker('update', props.data.uid, sticker)
          console.log(sticker)
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
