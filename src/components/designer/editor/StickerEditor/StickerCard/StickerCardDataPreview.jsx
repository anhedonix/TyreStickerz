import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import RemoveIcon from '@material-ui/icons/Remove'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import ChangeHistoryTwoToneIcon from '@material-ui/icons/ChangeHistoryTwoTone'

const useStyles = makeStyles(theme => ({
  stickerCardDataPreview: {
    width: '25%',
    // flexGrow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: '4px',
    // '&:hover': {
    //   // opacity: '.5',
    //   backgroundColor: '#8888',
    //   cursor: 'pointer',
    // },
  },
  coverageCircle: {
    width: '100%',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    margin: '4px',
  },
  data: {
    // margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // flexGrow: '1',
    // width: '50px',
    alignItems: 'center',
  },
}))

const StickerCardDataPreview = props => {
  const classes = useStyles()

  const start = props.data.start - 180
  const end = props.data.start + props.data.length - 180
  const coverage = props.data.length
  const offsetCoverage = coverage * props.data.offsetV
  const offsetScaledCoverage = (offsetCoverage + coverage) * props.data.scaleV
  const usableCanvas = coverage - offsetCoverage

  // const calculateOffsetV = () => {
  //   const usedDegree = props.data.End - props.data.Start
  //   const offsetV = props.data.Start + usedDegree * props.data.offsetV
  //   return offsetV
  // }
  const coverageCircle =
    offsetScaledCoverage >= usableCanvas
      ? (usableCanvas / 360) * 100
      : (offsetScaledCoverage / 360) * 100

  return (
    <div
      className={classes.stickerCardDataPreview}
      onClick={() => {
        // console.log('editMode')
      }}
      {...props}
    >
      <div className={classes.data}>
        <div className={classes.coverageCircle}>
          <CircularProgress
            variant="static"
            value={100}
            size={80}
            style={{
              opacity: '0.6',
              color: 'black',
              // height: '90px',
              // position: 'absolute',
            }}
            thickness={10}
          />

          <CircularProgress
            variant="static"
            value={coverageCircle}
            thickness={
              10 - props.data.offsetU * 10 <= props.data.scaleU * 10
                ? 10 - props.data.offsetU * 10
                : props.data.scaleU * 10
            }
            size={80 - 38 * props.data.offsetU}
            style={{
              position: 'absolute',
              transform: `rotate(${start + offsetCoverage}deg)`,
              color: 'white',
            }}
          />
          <CircularProgress
            variant="static"
            value={2}
            thickness={10}
            size={80}
            style={{
              position: 'absolute',
              transform: `rotate(${start}deg)`,
              color: 'green',
            }}
          />
          <CircularProgress
            variant="static"
            value={2}
            thickness={10}
            size={80}
            style={{
              position: 'absolute',
              transform: `rotate(${end}deg)`,
              color: 'red',
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default StickerCardDataPreview
