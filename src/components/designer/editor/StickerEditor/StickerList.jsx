import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Scroll from 'react-scrollbars-custom'

import { DarkThemeContainer } from '../../../../config/theme'

const useStyles = makeStyles(theme => ({
  stickerList: {
    display: 'flex',
    flexDirection: 'column',
    width: '600px',
    top: '0',
    left: '-620px',
    height: '100%',
    // padding: '24px',
    position: 'absolute',
  },
  sortBar: {
    minHeight: '50px',
    width: '100%',
    // backgroundColor: theme.palette.background.default,
  },
  listItem: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 'auto',
    minHeight: '80px',
    margin: '8px',
    // backgroundColor: 'red',
    // margin: ' 0 0 2px',
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
    <DarkThemeContainer>
      <Paper className={classes.stickerList} elevation={20}>
        <div className={classes.sortBar}>sortbar</div>
        <Scroll>
          {list.map(image => (
            <Paper
              variant="outlined"
              className={classes.listItem}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => {
                props.updateStickers(props.index, 'Sticker', image)
              }}
            />
          ))}
        </Scroll>
      </Paper>
    </DarkThemeContainer>
  )
}
export default StickerList
