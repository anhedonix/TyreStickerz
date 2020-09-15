import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const fileMenuList = ['New', 'Open', 'Save', 'Reset', 'Save Product Image']

  return (
    <Paper className={classes.menuBar}>
      <Button onClick={handleClick} style={{ marginLeft: '8px' }}>
        File
      </Button>
      <Button style={{ marginLeft: '8px' }}>help</Button>
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
        {fileMenuList.map(listItem => (
          <MenuItem
            onClick={e => {
              console.log(e.target.children.innerHTML)
              handleClose()
            }}
            children={listItem}
          />
        ))}
      </Menu>
    </Paper>
  )
}
export default DesignerMenuBar
