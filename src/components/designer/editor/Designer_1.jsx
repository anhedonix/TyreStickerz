import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Canvas from './Canvas/index'
import StickerEditor from './StickerEditor/StickerEditor'

const useStyles = makeStyles(theme => ({
  designer: {
    display: 'flex',
    width: '100vw',
    height: `calc(100vh - 100px)`,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundImage: `url('/BGs/DesignerBanner.png')`,
    backgroundSize: '100% 100%',
  },
  canvas: {
    width: '80vh',
    height: `calc(80vh - 100px)`,
  },
}))

const Designer = () => {
  const classes = useStyles()

  return (
    <div className={classes.designer}>
      <div className={classes.canvas}>
        <Canvas />
      </div>
      <StickerEditor />
    </div>
  )
}

export default Designer
