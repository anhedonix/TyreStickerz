import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'

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

  const listItemFunction = listItem => {
    switch (listItem) {
      case 'New':
        console.log('new')
        break
      case 'Open':
        console.log('open')
        break
      case 'Save':
        console.log('save')
        break
      case 'Reset':
        console.log('reset')
        break
      case 'Save Product Image':
        console.log('save product image')
        break
      case 'About':
        setAbout(true)
        console.log('about')
        break
      case 'Help':
        console.log('help')
        break
      default:
        break
    }
  }
  const file = ['New', 'Open', 'Save', 'Reset', 'Save Product Image']
  const help = ['About', 'Help']

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
                listItemFunction(listItem)
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
      <MenuHead head="file" list={file} />
      <MenuHead head="help" list={help} />
      <Dialog open={about} onClose={() => setAbout(false)}>
        test
      </Dialog>
    </Paper>
  )
}
export default DesignerMenuBar
