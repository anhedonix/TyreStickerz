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
import store from '../../../../../functions/store'

const useStyles = makeStyles(theme => ({
  stickerList: {
    display: 'flex',
    flexDirection: 'column',
    width: '340px',
    height: '100%',
    position: 'absolute',
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

const Sticker = props => {
  const classes = useStyles()

  const [image, setImage] = useState()
  useEffect(() => {
    store.getFileUrl(props.path).then(p => {
      setImage(p)
    })
  }, [])

  if (image) {
    return (
      <Paper
        variant="outlined"
        className={classes.listItem}
        style={{
          backgroundImage: `url(${image})`,
        }}
        onClick={() => {
          props.updateSticker(image, props.path)
          props.setListView(false)
        }}
      />
    )
  } else {
    return null
  }
}
const StickerList = props => {
  const classes = useStyles()
  const [stickerList, setStickerList] = useState([])
  const [currentCategory, setCurrentCategory] = useState(TYPES[1])

  const handleChange = e => {
    setCurrentCategory(e.target.value)
  }

  useEffect(() => {
    CONTENT.sticker_graphics
      .read(null, `category:${currentCategory}`)
      .then(e => setStickerList(e))
  }, [currentCategory])

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
        {/* <Scrollbars> */}
        {stickerList.map(data => (
          <Sticker
            path={data.image}
            key={data.image}
            updateSticker={props.updateSticker}
            setListView={props.setListView}
          />
        ))}
        {/* </Scrollbars> */}
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
