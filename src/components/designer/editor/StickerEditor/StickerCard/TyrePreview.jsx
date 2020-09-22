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
    backgroundImage: `url('/TyrePreview.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    pointerEvents: 'none',
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

  const coverageCircle =
    offsetScaledCoverage >= usableCanvas
      ? (usableCanvas / 360) * 100
      : (offsetScaledCoverage / 360) * 100

  const calcThickness =
    props.data.offsetU < -0
      ? props.thickness * props.data.scaleU - Math.abs(2.5 * props.data.offsetU)
      : props.thickness * props.data.scaleU

  return (
    <div className={classes.coverageCircle} style={{ height: props.size }}>
      <CircularProgress
        variant="static"
        value={coverageCircle}
        thickness={calcThickness}
        size={props.size - props.size * 0.405 * props.data.offsetU}
        style={{
          position: 'absolute',
          transform:
            props.data.offsetV < 0
              ? `rotate(${start}deg)`
              : `rotate(${start + offsetCoverage}deg)`,
          opacity: '.6',
          color: '#ccc',
        }}
      />
      {props.data.mirror && (
        <CircularProgress
          variant="static"
          value={coverageCircle}
          thickness={calcThickness}
          size={props.size - props.size * 0.405 * props.data.offsetU}
          style={{
            position: 'absolute',
            transform:
              props.data.offsetV < 0
                ? `rotate(${start}deg)`
                : `rotate(${start + offsetCoverage + 180}deg)`,
            opacity: '.6',
            color: '#ccc',
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
