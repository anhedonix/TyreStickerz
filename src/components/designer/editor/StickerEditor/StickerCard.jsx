import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import StickerList from './StickerList'

const useStyles = makeStyles(theme => ({
  stickerCardPreview: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    margin: ' 0 0 4% 0',
    // position: 'relative',
  },
  image: data => ({
    width: '100%',
    height: '10vh',
    // backgroundColor: 'red',

    backgroundImage: `url(${data && data.Sticker})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
      opacity: '.5',
    },
  }),

  editMode: {
    display: 'flex',
    // flexDirection: 'Column',
    height: '30vh',
    width: '100%',
    margin: ' 0 0 4% 0',
  },
  dataCard: {
    width: '50%',
    height: '100%',
  },
  data: {
    display: 'flex',
  },
}))

const StickerCardPreview = props => {
  const classes = useStyles(props.data)
  const keys = Object.keys(props.data)
  const keyShorts = keys.map(e => e.replace(/[a-z]/g, ''))

  return (
    <Paper
      className={classes.stickerCardPreview}
      onClick={() => props.setEditMode(!props.editmode)}
    >
      <div className={classes.image} />
      <div className={classes.data}>
        {Object.values(props.data).map((e, i) => (
          <div style={{ margin: '4px' }}>
            {i != 0 ? keyShorts[i] + '=' + e : null}
          </div>
        ))}
      </div>
    </Paper>
  )
}

const StickerCardEdit = props => {
  const classes = useStyles(props.data)
  return (
    <Paper className={classes.editMode}>
      <StickerList />
      <div className={classes.dataCard}>
        <div className={classes.image} />
        <Typography id="discrete-slider" gutterBottom>
          Starting Degree
        </Typography>
        <Slider
          defaultValue={props.data.StartingDegree}
          getAriaValueText={props.data.StartingPoint}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={2.5}
          marks
          min={0}
          max={360}
        />
        <Typography id="discrete-slider" gutterBottom>
          Ending Degree
        </Typography>
        <Slider
          defaultValue={props.data && props.data.EndingDegree}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={2.5}
          marks
          min={0}
          max={360}
        />
        <Typography id="discrete-slider" gutterBottom>
          Offset X
        </Typography>
        <Slider
          defaultValue={props.data.OffsetX}
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
          defaultValue={props.data.OffsetY}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0}
          max={1}
        />
        <Button
          onClick={() => {
            props.setEditMode(!props.editMode)
          }}
        >
          apply
        </Button>
      </div>
    </Paper>
  )
}

const StickerCard = props => {
  return (
    <>
      {props.editMode ? (
        <StickerCardEdit
          setEditMode={props.setEditMode}
          editMode={props.editMode}
          data={props.data}
        />
      ) : (
        <StickerCardPreview
          setEditMode={props.setEditMode}
          editMode={props.editMode}
          data={props.data}
        />
      )}
    </>
  )
}
export default StickerCard
