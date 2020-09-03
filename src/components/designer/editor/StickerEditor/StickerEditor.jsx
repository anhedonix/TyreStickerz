import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import css from 'dom-css'
import React, { useRef, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import StickerCard from './StickerCard/StickerCard'

const useStyles = makeStyles(theme => ({
  stickerWrapper: {
    float: 'right',
    // display: 'block',
    // width: '360px',
    position: 'absolute',
    right: '8px',
    top: '8px',
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
      <IconButton
        onClick={create}
        className={classes.addStickerCard}
        disabled={stickers.length >= maxStickers}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      {`${stickers.length} of ${maxStickers}`}
      <div style={{ position: 'relative' }}>
        <Scrollbars
          onUpdate={handleScroll}
          style={{
            minHeight: 480,
            height: 'calc(80vh - 100px)',
            width: 360,
          }}
          universal
        >
          {stickers.map(e => {
            if (currentSticker && e.uid === currentSticker.uid) {
              return (
                <StickerCard
                  edit
                  key={e.uid}
                  data={currentSticker}
                  update={setCurrentSticker}
                  apply={update}
                />
              )
            } else {
              return (
                <StickerCard
                  key={e.uid}
                  data={e}
                  setCurrentSticker={setCurrentSticker}
                  update={update}
                />
              )
            }
          })}
        </Scrollbars>

        <div ref={shadowTop} style={shadowTopStyle} />
        <div ref={shadowBottom} style={shadowBottomStyle} />
      </div>
    </div>
  )
}

export default StickerEditor
