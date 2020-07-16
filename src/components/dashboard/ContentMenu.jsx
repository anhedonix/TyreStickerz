import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AdminContentTypes from '../../constants/admin'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(128,128,128,0.5)',
  },
  menuItem: {
    padding: '1rem 2rem',
  },
}))

const MenuItem = props => {
  const classes = useStyles()
  return <div className={classes.menuItem}>{props.label}</div>
}

const ContentMenu = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {AdminContentTypes.map(el => (
        <MenuItem {...el} key={el.ID} />
      ))}
    </div>
  )
}

export default ContentMenu
