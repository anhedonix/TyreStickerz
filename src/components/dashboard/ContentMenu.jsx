import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AdminContentTypes from '../../constants/admin'
import Link from 'next/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import DashboardIcon from '@material-ui/icons/Dashboard'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(128,128,128,0.5)',
  },
}))

const MenuItem = props => {
  return (
    <Link href={`/dashboard/[contentType]`} as={`/dashboard/${props.ID}`}>
      <ListItem button>
        <ListItemIcon>{props.extra.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItem>
    </Link>
  )
}

const ContentMenu = () => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      <ListItem button>
        <Link href={`/dashboard`} as={`/dashboard`}>
          <a className={classes.anchor}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </a>
        </Link>
      </ListItem>
      <Divider />
      {AdminContentTypes.map(el => (
        <MenuItem {...el} key={el.ID} />
      ))}
    </List>
  )
}

export default ContentMenu
