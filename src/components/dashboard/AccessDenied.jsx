import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

const useStyles = makeStyles(theme => ({
  accesDeniedRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  warningIcon: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vw',
    maxHeight: '600px',
    margin: '56px',
  },

  lock: {
    width: '20vw',
    height: '20vw',
    maxWidth: '300px',
    color: '#ef5350',
  },
  circle: {
    width: '40vw',
    height: '40vw',
    maxWidth: '600px',
    position: 'absolute',
    color: '#8888',
  },
  message: {
    fontSize: '20px',
  },
}))

const AccessDenied = () => {
  const classes = useStyles()
  return (
    <div className={classes.accesDeniedRoot}>
      <div className={classes.warningIcon}>
        <NoEncryptionIcon className={classes.lock} />
        <RadioButtonUncheckedIcon className={classes.circle} />
      </div>
      <p className={classes.message}>
        You have to be an Admin to access this page
      </p>
      <Button variant="outlined" color="primary" style={{ margin: '32px' }}>
        Sign In
      </Button>
    </div>
  )
}

export default AccessDenied
