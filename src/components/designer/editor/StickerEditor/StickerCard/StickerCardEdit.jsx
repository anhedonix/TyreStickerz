import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  stickerCardEdit: {
    width: '340px',
    minHeight: '300px',
    // backgroundColor: 'red',
    // opacity: '.5',
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
        defaultValue={props.data.Start}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={360}
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
      />
      <Typography id="discrete-slider" gutterBottom>
        Offset Y
      </Typography>
      <Slider
        defaultValue={props.data.offsetV}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={1}
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
      />
      <Button
        onClick={() => {
          props.setEditCard(!props.editCard)
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
