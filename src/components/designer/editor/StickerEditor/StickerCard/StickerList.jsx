import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Scrollbars } from 'react-custom-scrollbars'
import Button from '@material-ui/core/Button'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { DarkThemeContainer } from '../../../../../config/theme'
import * as CONTENT from '../../../../../constants/contentTypes'
import { TYPES } from '../../../../../constants/stickerCategories'

const useStyles = makeStyles(theme => ({
  stickerList: {
    display: 'flex',
    flexDirection: 'column',
    width: '340px',
    height: '100%',
  },
  sortBar: {
    minHeight: '50px',
    width: '100%',
    padding: '8px',
  },
  listItem: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 'auto',
    minHeight: '80px',
    margin: '8px',
  },
}))
console.log('working')
const StickerList = props => {
  const classes = useStyles()
  const [stickerList, setStickerList] = useState()
  const [currentCategory, setCurrentCategory] = useState(TYPES[0])

  const handleChange = e => {
    setCurrentCategory(e.target.value)
  }

  useEffect(() => {
    // CONTENT.sticker_graphics.read().then(e => console.log(e))
  }, [])

  console.log(currentCategory)

  return (
    <DarkThemeContainer>
      <Paper className={classes.stickerList} elevation={20}>
        <div className={classes.sortBar}>
          Sticker Category
          <Select
            value={currentCategory}
            onChange={handleChange}
            style={{ marginLeft: '16px' }}
          >
            {TYPES.map(e => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </div>
        <Scrollbars>
          {/* {list.map(image => (
            <Paper
              variant="outlined"
              className={classes.listItem}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => {
                props.setListView(false)
              }}
            />
          ))} */}
        </Scrollbars>
        <Button
          variant="contained"
          style={{ width: '100%' }}
          color="primary"
          onClick={() => {
            props.setListView(false)
          }}
        >
          Cancel
        </Button>
      </Paper>
    </DarkThemeContainer>
  )
}
export default StickerList
