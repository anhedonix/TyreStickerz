import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Save from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'

import { items } from './MenuItems'

const useStyles = makeStyles(theme => ({
  menuBar: {
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}))

const MenuHead = props => {
  const setAbout = props.setAbout
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
      >
        {props.list.map(listItem => (
          <MenuItem
            onClick={e => {
              props.functions[listItem]()
              handleClose()
            }}
            children={listItem}
            key={listItem}
          />
        ))}
      </Menu>
    </>
  )
}

const DesignerMenuBar = props => {
  const classes = useStyles()

  const [name, setName] = useState('')

  return (
    <Paper className={classes.menuBar} square>
      {items.map(item => (
        <MenuHead
          head={item.head}
          list={item.list}
          key={item.head}
          {...props}
        />
      ))}
      <div style={{ marginLeft: 'auto', marginTop: '0.8rem' }}>
        Name: <TextField value={name} onChange={e => setName(e.target.value)} />
        <IconButton
          style={{ marginTop: '-0.8rem' }}
          disabled={name.length < 5}
          onClick={() => props.functions.Save(name)}
        >
          <Save />
        </IconButton>
      </div>
    </Paper>
  )
}
export default DesignerMenuBar
