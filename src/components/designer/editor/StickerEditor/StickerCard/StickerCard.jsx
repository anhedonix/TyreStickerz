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
      backgroundColor: '#8888',
      cursor: 'pointer',
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
  const [list, setList] = useState(false)
  const classes = useStyles(props)
  const [image, setImage] = useState()

  useEffect(() => {
    store.getFileUrl(props.data.texture.path).then(i => setImage(i))
  }, [])
  return (
    <DarkThemeContainer>
      <Paper
        elevation={1}
        onClick={props.onClick}
        className={classes.stickerCardPreview}
        style={{ height: props.edit || list ? '550px' : '200px' }}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${image})`,
          }}
          onClick={() => {
            setList(!list)
          }}
        />
        {list ? <StickerList setList={setList} /> : null}
        <IconButton
          style={{
            display: 'block',
            position: 'absolute',
            top: -5,
            right: -5,
          }}
          onClick={() => props.update('delete', props.data.uid)}
        >
          <HighlightOffIcon />
        </IconButton>
        {!props.edit ? (
          <StickerCardDataPreview
            data={props.data}
            onClick={() => {
              setList(false)
              props.setCurrentSticker(props.data)
            }}
          />
        ) : (
          <StickerCardEdit data={props.data} update={props.updateCurrent} />
        )}
      </Paper>
    </DarkThemeContainer>
  )
}
export default StickerCard
