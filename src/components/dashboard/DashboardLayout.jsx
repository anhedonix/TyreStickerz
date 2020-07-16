import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ContentMenu from './ContentMenu'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/Banners/DesignerBanner.png')`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
}))

const DashboardLayout = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ContentMenu />
      Dashboard Layout
    </div>
  )
}

export default DashboardLayout
