import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { DarkThemeContainer } from '../../../../../config/theme'
import StickerCardEditMode from './StickerCardEditMode'
import StickerCardPreview from './StickerCardPreview'
const useStyles = makeStyles(theme => ({
  stickerCardPreview: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '370px',
    height: '200px',
    margin: ' 0 0 1vh 10px',
    padding: '8px',
    position: 'relative',
  }),
  imageWrapper: props => ({
    width: '100%',
    position: 'relative',
    display: 'block',
    marginLeft: '8px',
    padding: '0 8px',
    backgroundColor: '#222222',
  }),
  image: props => ({
    width: '100%',
    minHeight: '100px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
  const [list, setList] = useState(false)
  const classes = useStyles(props)
  const [sticker, setSticker] = useState(props.data)

  return (
    <DarkThemeContainer>
      <Paper
        elevation={6}
        onClick={props.onClick}
        className={classes.stickerCardPreview}
        style={{ height: props.edit || list ? '620px' : '120px' }}
      >
        {!props.edit ? (
          <StickerCardPreview
            data={props.data}
            setCurrentSticker={props.setCurrentSticker}
          />
        ) : (
          <StickerCardEditMode
            data={props.data}
            update={props.update}
            apply={props.apply}
          />
        )}
      </Paper>
    </DarkThemeContainer>
  )
}
export default StickerCard
