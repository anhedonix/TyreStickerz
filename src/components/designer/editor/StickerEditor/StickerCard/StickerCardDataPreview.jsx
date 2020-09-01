import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import RemoveIcon from '@material-ui/icons/Remove'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import ChangeHistoryTwoToneIcon from '@material-ui/icons/ChangeHistoryTwoTone'

const useStyles = makeStyles(theme => ({
  stickerCardDataPreview: {
    width: '100%',
    flexGrow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: '4px',
    '&:hover': {
      // opacity: '.5',
      backgroundColor: '#8888',
      cursor: 'pointer',
    },
  },
  coverageCircle: {
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    margin: '4px',
  },
  data: {
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // flexGrow: '1',
    // width: '50px',
    // alignItems: 'center',
  },
}))

const StickerCardDataPreview = props => {
  const classes = useStyles()

  const coverageCircle = () => {
    const usedDegree = props.data.End - props.data.Start
    const percentage = (usedDegree / 360) * 100

    return percentage
  }
  const rotate = props.data.Start - 180

  return (
    <div
      className={classes.stickerCardDataPreview}
      onClick={() => {
        console.log('editMode')
      }}
      {...props}
    >
      <div className={classes.data}>
        <div className={classes.dataTitle}>Coverage</div>
        <div className={classes.coverageCircle}>
          <CircularProgress
            variant="static"
            value={100}
            color="#8888"
            style={{ opacity: '.5' }}
          />
          <CircularProgress
            variant="static"
            value={coverageCircle()}
            style={{
              position: 'absolute',
              transform: `rotate(${rotate}deg)`,
            }}
          />
        </div>
      </div>
      <div className={classes.data}>
        <div className={classes.dataTitle}> OffsetU</div>
        <div>
          <LinearProgress
            variant="determinate"
            value={props.data.offsetU * 100}
            style={{ colorPrimary: 'grey', colorSecondary: 'gray' }}
            colorPrimary="grey"
            colorSecondary="grey"
          />
        </div>
        <div className={classes.dataTitle}> OffsetV</div>
        <div>
          <LinearProgress
            variant="determinate"
            value={props.data.offsetU * 100}
          />
        </div>
      </div>
      <div className={classes.data}>
        <div className={classes.dataTitle}> ScaleU</div>
        <div>
          <LinearProgress
            variant="determinate"
            value={props.data.ScaleU * 100}
            style={{ colorPrimary: 'grey', colorSecondary: 'gray' }}
            colorPrimary="grey"
            colorSecondary="grey"
          />
        </div>
        <div className={classes.dataTitle}> ScaleV</div>
        <div>
          <LinearProgress
            variant="determinate"
            value={props.data.ScaleV * 100}
          />
        </div>
      </div>{' '}
      <div className={classes.data}>
        <div className={classes.dataTitle}> Mirror</div>
        <div
          className={classes.dataTitle}
          style={{
            color: props.data.Mirror ? 'green' : 'red',
            fontSize: '20px',
          }}
        >
          {props.data.mirror.toString()}
        </div>
      </div>
    </div>
  )
}
export default StickerCardDataPreview
