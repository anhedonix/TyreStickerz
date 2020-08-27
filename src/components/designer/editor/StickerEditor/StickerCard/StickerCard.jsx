import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { DarkThemeContainer } from '../../../../../config/theme'
import StickerList from './StickerList'
import store from '../../../../../functions/store'
import StickerCardDataPreview from './StickerCardDataPreview'

const useStyles = makeStyles(theme => ({
  stickerCardPreview: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '340px',
    height: '200px',
    margin: ' 0 0 1vh 0',
    padding: '8px',
    position: 'relative',
  }),
  image: props => ({
    width: '100%',
    minHeight: '80px',
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
    transition: 'height 500ms',
    width: '100%',
    margin: ' 0 0 1vh 0',
    position: 'relative',
  },
  dataCard: {
    width: '100%',
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

const StickerCard = props => {
  const [editCard, setEditCard] = useState(false)
  const classes = useStyles(props)
  const [image, setImage] = useState()
  // const [hover, setHover] = useState(false)

  useEffect(() => {
    store.getFileUrl(props.data.Texture.path).then(i => setImage(i))
  }, [])
  return (
    <DarkThemeContainer>
      <Paper
        elevation={1}
        onClick={props.onClick}
        className={classes.stickerCardPreview}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <IconButton
          style={{
            display: 'block',
            position: 'absolute',
            top: -5,
            right: -5,
          }}
          onClick={() => props.updateStickersList('delete', props.data.uid)}
        >
          <HighlightOffIcon />
        </IconButton>
        <StickerCardDataPreview data={props.data} />
      </Paper>
    </DarkThemeContainer>
  )
}
export default StickerCard
