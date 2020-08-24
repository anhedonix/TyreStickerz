import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  stickerList: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    // height: '100%',
    // padding: '24px',
  },
  sortBar: {
    minHeight: '50px',
    width: '100%',
    backgroundColor: theme.palette.action.disabled,
  },
  list: {
    overflowY: 'scroll',
  },
}))

const StickerList = props => {
  const classes = useStyles()
  const list = [
    '/resources/stickers/AMG.png',
    '/resources/stickers/BridgeStone.png',
    '/resources/stickers/Continental.png',
    '/resources/stickers/Dunlop.png',
    '/resources/stickers/AMG.png',
  ]
  return (
    <div className={classes.stickerList}>
      <div className={classes.sortBar}>sortbar</div>
      <div className={classes.list}>
        {list.map(image => (
          <Paper
            style={{
              width: 'auto',
              minHeight: '80px',
              // backgroundColor: 'red',
              margin: ' 0 0 2px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            onClick={() => {
              props.updateStickers(props.index, 'Sticker', image)
            }}
          />
        ))}
      </div>
    </div>
  )
}
export default StickerList
