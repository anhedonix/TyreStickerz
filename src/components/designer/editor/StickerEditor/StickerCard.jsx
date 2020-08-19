import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  stickerCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '40vh',
    height: '10vh',
    margin: ' 24px 0',
    alignItems: 'center',

    // backgroundColor: 'green',
  },
  image: {
    width: '70%',
    height: '80%',
    // backgroundColor: 'red',
    margin: '4%',
    backgroundImage: `url('/resources/stickers/Hankook.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
      opacity: '.5',
    },
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '2%',
    width: '100%',
  },
}))

const StickerCard = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.stickerCard}>
      <div className={classes.image} />
      <div className={classes.data}>
        <div>cover perpendicular:100</div>
        <div>cover degree:30</div>
      </div>
    </Paper>
  )
}
export default StickerCard
