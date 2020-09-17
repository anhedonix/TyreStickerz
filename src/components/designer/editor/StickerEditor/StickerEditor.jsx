import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import css from 'dom-css'
import React, { useRef, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import StickerCard from './StickerCard/StickerCard'
import Tooltip from '@material-ui/core/Tooltip'

import StickerEditMode from './StickerCard/StickerCardEditMode'
const useStyles = makeStyles(theme => ({
  stickerWrapper: {
    float: 'right',
    // display: 'block',
    // width: '360px',
    position: 'absolute',
    right: '8px',
    top: '58px',
    display: 'flex',
    flexDirection: 'column',
  },

  addStickerCard: {
    alignSelf: 'center',
    // width: '2vw',
    // height: '2vw',
    // color: '#8888',
    opacity: '.5',
    margin: '8px',
  },
}))

const maxStickers = 10

const StickerEditor = ({
  create,
  update,
  stickers,
  setCurrentSticker,
  currentSticker,
  setCurrentStickerTemp,
  currentStickerTemp,
}) => {
  const classes = useStyles()

  const shadowTop = useRef()
  const shadowBottom = useRef()

  const handleScroll = values => {
    const shadowTop_ = shadowTop.current
    const shadowBottom_ = shadowBottom.current
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    css(shadowTop_, { opacity: shadowTopOpacity })
    css(shadowBottom_, { opacity: shadowBottomOpacity })
  }

  const shadowTopStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    top: -1,
    left: '-20px',
    right: 0,
    height: 60,
    background:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
    borderRadius: '8px 8px 0 0',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    transition: 'opacity 200ms',
  }

  const shadowBottomStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    bottom: -1,
    left: '-20px',
    right: '0',
    height: 60,
    background:
      'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
    borderRadius: '0 0 8px 8px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    transition: 'opacity 200ms',
  }
  return (
    <div className={classes.stickerWrapper}>
      {!currentSticker ? (
        <>
          <Tooltip title="add new sticker" placement="left">
            <IconButton
              onClick={create}
              className={classes.addStickerCard}
              disabled={stickers.length >= maxStickers}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          {`${stickers.length} of ${maxStickers}`}
          <div style={{ position: 'relative' }}>
            <Scrollbars
              onUpdate={handleScroll}
              style={{
                minHeight: 480,
                height: 'calc(80vh - 100px)',
                width: 400,
              }}
              universal
            >
              {stickers.map(e => {
                return (
                  <StickerCard
                    key={e.uid}
                    data={e}
                    setCurrentSticker={() => {
                      setCurrentSticker(e)
                      setCurrentStickerTemp(e)
                    }}
                    update={update}
                  />
                )
              })}
            </Scrollbars>

            <div ref={shadowTop} style={shadowTopStyle} />
            <div ref={shadowBottom} style={shadowBottomStyle} />
          </div>
        </>
      ) : (
        <div
          style={{ position: 'relative', width: '400px', overflow: 'hidden' }}
        >
          <StickerEditMode
            data={currentStickerTemp}
            liveUpdate={setCurrentStickerTemp}
            update={setCurrentSticker}
            apply={update}
          />
        </div>
      )}
    </div>
  )
}

export default StickerEditor
