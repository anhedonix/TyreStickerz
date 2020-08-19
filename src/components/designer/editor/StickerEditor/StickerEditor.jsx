import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import StickerCard from './StickerCard'

const useStyles = makeStyles(theme => ({
  stickerEditor: {
    // width: `calc(100vw - calc(100vh - 100px))`,
    height: `calc(100vh - 100px)`,
    flexGrow: '1',
    // backgroundColor: 'red',
  },
}))

const StickerEditor = () => {
  const classes = useStyles()
  return (
    <div className={classes.stickerEditor}>
      <StickerCard />
    </div>
  )
}

export default StickerEditor
