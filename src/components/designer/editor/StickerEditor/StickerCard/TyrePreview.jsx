import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  coverageCircle: {
    width: '100%',
    // height: '80px',
    // flexGrow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('TyrePreview.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '& circle': {
      transition: 'none',
    },
    '& div': {
      transition: 'none',
    },
  },
}))

const TyrePreview = props => {
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
    <div className={classes.coverageCircle} style={{ height: props.size }}>
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
            props.thickness={props.thickness}
          /> */}

      <CircularProgress
        variant="static"
        value={coverageCircle}
        thickness={
          props.thickness - props.data.offsetU * props.thickness <=
          props.data.scaleU * props.thickness
            ? props.thickness - props.data.offsetU * props.thickness
            : props.data.scaleU * props.thickness
        }
        size={props.size - 38 * props.data.offsetU}
        style={{
          position: 'absolute',
          transform: `rotate(${start + offsetCoverage}deg)`,
          opacity: '.6',
          color: '#ccc',
        }}
      />
      {props.data.mirror && (
        <CircularProgress
          variant="static"
          value={coverageCircle}
          thickness={
            props.thickness - props.data.offsetU * props.thickness <=
            props.data.scaleU * props.thickness
              ? props.thickness - props.data.offsetU * props.thickness
              : props.data.scaleU * props.thickness
          }
          size={props.size - 38 * props.data.offsetU}
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
        value={100 / 180}
        thickness={props.thickness}
        size={props.size}
        style={{
          position: 'absolute',
          transform: `rotate(${start}deg)`,
          color: '#eeff00',
        }}
      />
      <CircularProgress
        variant="static"
        value={100 / 180}
        thickness={props.thickness}
        size={props.size}
        style={{
          position: 'absolute',
          transform: `rotate(${end}deg)`,
          color: 'red',
        }}
      />
    </div>
  )
}
export default TyrePreview
