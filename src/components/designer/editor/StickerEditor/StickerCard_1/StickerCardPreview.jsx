import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import EditIcon from '@material-ui/icons/Edit'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import ChangeHistoryTwoToneIcon from '@material-ui/icons/ChangeHistoryTwoTone'

const useStyles = makeStyles(theme => ({
  stickerCardDataPreview: {
    width: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: '4px',
    // '&:hover': {
    //   // opacity: '.5',
    //   backgroundColor: '#8888',
    //   cursor: 'pointer',
    // },
    '& circle': {
      transition: 'none',
    },
    '& div': {
      transition: 'none',
    },
  },
  coverageCircle: {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('TyrePreview.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  dataTitle: {
    margin: '4px',
  },
}))

const thickness = 8
const size = 100

const StickerDataPreview = props => {
  const classes = useStyles()

  const start = props.data.start - 180
  const end = props.data.start + props.data.length - 180
  const coverage = props.data.length
  const offsetCoverage = coverage * props.data.offsetV
  const offsetScaledCoverage = (offsetCoverage + coverage) * props.data.scaleV
  const usableCanvas = coverage - offsetCoverage
  const scale = { x: '100', y: '100' }

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
    <div className={classes.stickerCardDataPreview}>
      <div className={classes.coverageCircle}>
        {/* <CircularProgress
            variant='static'
            value={100}
            size={size}
            style={{
              opacity: '0.6',
              color: 'black',
              // height: '90px',
              // position: 'absolute',
            }}
            thickness={thickness}
          /> */}

        <CircularProgress
          variant="static"
          value={coverageCircle}
          thickness={
            thickness - props.data.offsetU * thickness <=
            props.data.scaleU * thickness
              ? thickness - props.data.offsetU * thickness
              : props.data.scaleU * thickness
          }
          size={size - 38 * props.data.offsetU}
          style={{
            position: 'absolute',
            transform: `rotate(${start + offsetCoverage}deg)`,
            opacity: '.4',
            color: '#8cf',
          }}
        />
        {props.data.mirror && (
          <CircularProgress
            variant="static"
            value={coverageCircle}
            thickness={
              thickness - props.data.offsetU * thickness <=
              props.data.scaleU * thickness
                ? thickness - props.data.offsetU * thickness
                : props.data.scaleU * thickness
            }
            size={size - 38 * props.data.offsetU}
            style={{
              position: 'absolute',
              transform: `rotate(${start + offsetCoverage + 180}deg)`,
              opacity: '.3',
              color: '#fff',
            }}
          />
        )}
        <CircularProgress
          variant="static"
          value={2}
          thickness={thickness}
          size={size}
          style={{
            position: 'absolute',
            transform: `rotate(${start}deg)`,
            color: '#eeff00',
          }}
        />
        <CircularProgress
          variant="static"
          value={2}
          thickness={thickness}
          size={size}
          style={{
            position: 'absolute',
            transform: `rotate(${end}deg)`,
            color: 'red',
          }}
        />
        {/* <IconButton
            style={{ position: 'absolute' }}
            color='primary'
            onClick={props.setCurrentSticker}
          >
            <EditIcon />
          </IconButton> */}
      </div>
    </div>
  )
}
export default StickerDataPreview
