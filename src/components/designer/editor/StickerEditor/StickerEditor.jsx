import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import StickerCard from './StickerCard'
import StickerList from './StickerList'

const useStyles = makeStyles(theme => ({
  stickerEditor: {
    // width: `calc(100vw - calc(100vh - 100px))`,
    display: 'flex',
    height: `calc(100vh - 100px)`,
    flexGrow: '1',
    // backgroundColor: 'red',
  },
}))

const StickerEditor = () => {
  const classes = useStyles()
  const list = [
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
    '/resources/stickers/Hankook.png',
  ]
  return (
    <div className={classes.stickerEditor}>
      <StickerList list={list} />
      <StickerCard />
    </div>
  )
}

export default StickerEditor
