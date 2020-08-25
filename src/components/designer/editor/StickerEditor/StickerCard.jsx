import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'

import { DarkThemeContainer } from '../../../../config/theme'
import StickerList from './StickerList'
import store from '../../../../functions/store'

const useStyles = makeStyles(theme => ({
  stickerCardPreview: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '340px',
    height: '120px',
    margin: ' 0 0 1vh 0',
    padding: '8px',
    position: 'relative',
  }),
  image: props => ({
    width: '100%',
    // height: '10vh',
    minHeight: '80px',
    // backgroundColor: 'red',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
      opacity: props.editCard ? '1' : '.5',
    },
    position: 'relative',
    display: 'block',
  }),

  editMode: {
    display: 'flex',
    // flexDirection: 'Column',
    // height: '330px',
    transition: 'height 500ms',
    width: '100%',
    margin: ' 0 0 1vh 0',
    position: 'relative',
  },
  dataCard: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    width: '100%',
    // height: '100%',
    padding: '8px',
  },
  data: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    width: '60%',
  },
}))

const StickerCardPreview = props => {
  const classes = useStyles(props)
  const keys = Object.keys(props.data)
  const keyShorts = keys.map(e => e.replace(/[a-z]/g, ''))
  const [image, setImage] = useState()

  useEffect(() => {
    store.getFileUrl(props.data.Texture.path).then(i => setImage(i))
  }, [])

  return (
    <Paper
      elevation={1}
      /* variant="outlined" */
      onClick={props.onClick}
      className={classes.stickerCardPreview}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className={classes.data}>
        {Object.values(props.data).map((e, i) => (
          <div style={{ margin: '4px' }}>
            {![0, 1, 9].includes(i) ? keyShorts[i] + '=' + e : null}
          </div>
        ))}
      </div>
    </Paper>
  )
}

const StickerCardEdit = props => {
  const classes = useStyles(props)
  return (
    <Paper className={classes.editMode} elevation={0}>
      <StickerList updateStickers={props.updateStickers} index={props.index} />
      <div className={classes.dataCard}>
        <div className={classes.image} />
        <div className={classes.data}>
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
            className={classes.input}
          />
        </div>
        <div className={classes.data}>
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
            className={classes.input}
          />
        </div>
        <div className={classes.data}>
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
            className={classes.input}
          />
        </div>
        <div className={classes.data}>
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
            className={classes.input}
          />
        </div>
        <div className={classes.data}>
          <Typography id="discrete-slider" gutterBottom>
            Scale Y
          </Typography>
          <Slider
            defaultValue={props.data.OffsetY}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={1}
            className={classes.input}
          />
        </div>
        <div className={classes.data}>
          <Typography id="discrete-slider" gutterBottom>
            Scale Y
          </Typography>
          <Slider
            defaultValue={props.data.OffsetY}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={1}
            className={classes.input}
          />
        </div>
        <div className={classes.data} style={{ justifyContent: 'flex-Start' }}>
          <Typography
            id="discrete-slider"
            gutterBottom
            style={{ margin: '0 90px 0 0' }}
          >
            Mirror
          </Typography>
          <Switch
            defaultValue={props.data.Mirror}
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
        </div>
        <Button
          style={{ width: '100%' }}
          onClick={() => {
            props.setEditCard(!props.editCard)
          }}
          color="primary"
          variant="contained"
        >
          apply
        </Button>
      </div>
    </Paper>
  )
}

const StickerCard = props => {
  const [editCard, setEditCard] = useState(false)

  return (
    <DarkThemeContainer>
      {editCard ? (
        <StickerCardEdit
          data={props.data}
          editCard={editCard}
          setEditCard={setEditCard}
          updateStickers={props.updateStickers}
        />
      ) : (
        <StickerCardPreview
          data={props.data}
          onClick={() => {
            console.log('running')
            setEditCard(true)
          }}
        />
      )}
    </DarkThemeContainer>
  )
}
export default StickerCard
