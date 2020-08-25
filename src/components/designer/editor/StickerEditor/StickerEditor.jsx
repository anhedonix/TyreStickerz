import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import StickerCard from './StickerCard'
import { useEffect } from 'react'
import Scroll from 'react-scrollbars-custom'

const useStyles = makeStyles(theme => ({
  stickerEditor: editMode => ({
    height: `calc(100vh - 104px)`,
    width: '19vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    // overflowY: 'scroll',
    overflowX: 'visible',
    transition: 'width 500ms',
    padding: '8px',
  }),
  addStickerCard: {
    alignSelf: 'center',
    width: '2vw',
    height: '2vw',
    // color: '#8888',
    opacity: '.5',
    margin: '8px',
  },
  scroll: {
    height: `calc(100vh - 104px)`,
    width: '100%',
  },
}))
const defaults = {
  uid: 0,
  Sticker: '/resources/stickers/M_Performance.png',
  StartingDegree: 45,
  EndingDegree: 135,
  offsetU: 0,
  offsetV: 0,
  ScaleU: 1,
  ScaleV: 1,
  Mirror: false,
}
const StickerEditor = props => {
  const classes = useStyles(props.editMode)

  const [stickersList, updateStickersList] = useState([defaults])

  const [triger, setTriger] = useState(false)

  const createNewStickerCard = () => {
    updateStickersList([
      { ...defaults, uid: stickersList.length },
      ...stickersList,
    ])
  }

  const updateStickers = (current, property, value) => {
    const tempStickersList = stickersList
    const tempSticker = stickersList[current]
    tempSticker[property] = value
    tempStickersList[current] = tempSticker
    updateStickersList(tempStickersList)
    setTriger(!triger)
  }

  return (
    // <Scroll>
    <div className={classes.stickerEditor}>
      <AddCircleIcon
        className={classes.addStickerCard}
        onClick={createNewStickerCard}
      />
      {stickersList.map((e, i) => (
        <StickerCard
          key={e.uid}
          data={e}
          index={i}
          updateStickers={updateStickers}
        />
      ))}
    </div>
    // </Scroll>
  )
}

export default StickerEditor
