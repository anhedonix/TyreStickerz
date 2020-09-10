import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Scrollbars } from 'react-custom-scrollbars'
import Button from '@material-ui/core/Button'

import { DarkThemeContainer } from '../../../../../config/theme'

const useStyles = makeStyles(theme => ({
  stickerList: {
    display: 'flex',
    flexDirection: 'column',
    width: '340px',
    height: '100%',
  },
  sortBar: {
    minHeight: '50px',
    width: '100%',
  },
  listItem: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 'auto',
    minHeight: '80px',
    margin: '8px',
  },
}))
console.log('working')
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
        <Scrollbars>
          {list.map(image => (
            <Paper
              variant="outlined"
              className={classes.listItem}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => {
                props.setListView(false)
              }}
            />
          ))}
        </Scrollbars>
        <Button
          variant="contained"
          style={{ width: '100%' }}
          color="primary"
          onClick={() => {
            props.setListView(false)
          }}
        >
          Cancel
        </Button>
      </Paper>
    </DarkThemeContainer>
  )
}
export default StickerList
