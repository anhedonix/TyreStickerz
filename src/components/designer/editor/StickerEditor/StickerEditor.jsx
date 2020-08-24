import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import StickerCard from './StickerCard'
import { useEffect } from 'react'
import { log } from 'three'

const useStyles = makeStyles(theme => ({
  stickerEditor: editMode => ({
    height: `calc(100vh - 104px)`,
    width: editMode ? '40vw' : '20vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    overflowY: 'scroll',
    // transition: 'width 500ms',
  }),
  addStickerCard: {
    alignSelf: 'center',
    width: '2vw',
    height: '2vw',
    // color: '#8888',
    opacity: '.5',
    margin: '8px',
  },
}))

const StickerEditor = props => {
  const classes = useStyles(props.editMode)

  const defaults = {
    Sticker: '/resources/stickers/M_Performance.png',
    StartingDegree: 45,
    EndingDegree: 135,
    offsetU: 0,
    offsetV: 0,
    ScaleU: 1,
    ScaleV: 1,
    Mirror: false,
  }
  const [stickersList, updateStickersList] = useState([defaults])
  const [cardsStatus, setCardsStatus] = useState([false])
  const [triger, setTriger] = useState(false)

  const createNewStickerCard = () => {
    const tempStickersList = stickersList
    let temp = cardsStatus

    updateStickersList(tempStickersList.concat(defaults))
    setCardsStatus(temp.concat(false))
  }

  const updateCardStatus = (value, i) => {
    let temp = cardsStatus
    temp[i] = value
    setCardsStatus(temp)
    setTriger(!triger)
  }
  const updateStickers = (current, property, value) => {
    const tempStickersList = stickersList
    const tempSticker = stickersList[current]
    tempSticker[property] = value
    tempStickersList[current] = tempSticker
    updateStickersList(tempStickersList)
    setTriger(!triger)
  }
  useEffect(() => {
    const temp = cardsStatus.includes(true)

    if (temp) {
      props.setEditMode(true)
    } else {
      props.setEditMode(false)
    }
  }, [triger])

  return (
    <div className={classes.stickerEditor}>
      <AddCircleIcon
        className={classes.addStickerCard}
        onClick={createNewStickerCard}
      />
      {stickersList.map((e, i) => (
        <StickerCard
          updateCardStatus={updateCardStatus}
          data={e}
          index={i}
          cardsStatus={cardsStatus}
          editMode={props.editMode}
          updateStickers={updateStickers}
        />
      ))}
    </div>
  )
}

export default StickerEditor
