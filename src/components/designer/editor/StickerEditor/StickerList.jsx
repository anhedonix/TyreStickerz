import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  stickerList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: `calc(100vh - 100px)`,
    // padding: '24px',
    overflow: 'scroll',
  },
  sortBar: {
    minHeight: '4vh',
    width: '100%',
    backgroundColor: 'red',
  },
}))

const StickerList = props => {
  const classes = useStyles()
  return (
    <div className={classes.stickerList}>
      <div className={classes.sortBar}>sortbar</div>
      {props.list.map(list => (
        <Paper
          style={{
            width: 'auto',
            minHeight: '80px',
            // backgroundColor: 'red',
            margin: '16px',
            backgroundImage: `url(${list})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </div>
  )
}
export default StickerList
