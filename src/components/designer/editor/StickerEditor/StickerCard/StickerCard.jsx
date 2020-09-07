import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { DarkThemeContainer } from '../../../../../config/theme'
import store from '../../../../../functions/store'
import StickerCardDataPreview from './StickerCardDataPreview'
import StickerCardEdit from './StickerCardEdit'
import StickerList from './StickerList'
import { Button } from '@material-ui/core'

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
        <div style={{ display: 'flex', width: '100%' }}>
          <StickerCardDataPreview
            data={props.data}
            setCurrentSticker={props.setCurrentSticker}
          />
          <Paper className={classes.imageWrapper} variant="outlined">
            <div
              className={classes.image}
              style={{
                backgroundImage: `url(${sticker.texture.file})`,
              }}
            />
          </Paper>
        </div>

        {list ? <StickerList setList={setList} /> : null}

        {!props.edit && (
          <IconButton
            style={{
              display: 'block',
              position: 'absolute',
              top: -14,
              right: -14,
            }}
            onClick={() => {
              props.update('delete', props.data)
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        )}

        {props.edit && (
          <StickerCardEdit
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
