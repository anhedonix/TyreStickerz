import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ContentMenu from './ContentMenu'
import ContentPalette from './ContentPalette'
import Content from './Content'
import Router from 'next/router'
import mainContext, { MainContext } from '../../states/mainState'
import * as USER from '../../constants/user'
import AccessDenied from './AccessDenied'

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
  const { state } = useContext(MainContext)

  return [USER.DEV, USER.ADMIN].includes(state.userData.type) && state.user ? (
    <div className={classes.root}>
      <ContentMenu />
      <ContentPalette />
      <Content />
    </div>
  ) : (
    <AccessDenied />
  )
}

export default DashboardLayout
