import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import Dialog from '@material-ui/core/Dialog'

import { items, listItemFunctions } from './MenuItems'
import AboutDialogue from './AboutDialog'

const useStyles = makeStyles(theme => ({
  menuBar: {
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}))

const DesignerMenuBar = props => {
  const classes = useStyles()
  const [about, setAbout] = useState(false)

  const MenuHead = props => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }
    return (
      <>
        <Button onClick={handleClick} style={{ marginLeft: '8px' }}>
          {props.head}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {props.list.map(listItem => (
            <MenuItem
              onClick={e => {
                listItemFunctions(listItem, setAbout)
                handleClose()
              }}
              children={listItem}
            />
          ))}
        </Menu>
      </>
    )
  }

  return (
    <Paper className={classes.menuBar}>
      {items.map(item => (
        <MenuHead head={item.head} list={item.list} />
      ))}
      <Dialog open={about} onClose={() => setAbout(false)}>
        <AboutDialogue />
      </Dialog>
    </Paper>
  )
}
export default DesignerMenuBar
