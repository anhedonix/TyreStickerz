import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import TyrePreview from './TyrePreview'

const useStyles = makeStyles(theme => ({
  stickerCardDataPreview: {
    width: '100%',
    flexGrow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: '4px',
    // '&:hover': {
    //   // opacity: '.5',
    //   backgroundColor: '#8888',
    //   cursor: 'pointer',
    // },
    '& circle': {
      transition: 'none',
    },
    '& div': {
      transition: 'none',
    },
  },
  dataTitle: {
    margin: '4px',
  },
}))

const StickerDataPreview = props => {
  const classes = useStyles()

  return (
    <div className={classes.stickerCardDataPreview}>
      <div style={{ width: '100px' }}>
        <TyrePreview data={props.data} />
      </div>
      <div
        style={{
          backgroundColor: 'black',
          padding: '8px',
          margin: '4px',
          borderRadius: '.5rem',
        }}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${props.data.texture.file})`,
            width: '170px',
            height: '60px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <IconButton
        variant="outline"
        style={{
          // backgroundColor: '#8888',
          height: '60px',
          width: '60px',
          // color: 'orange',
          margin: '16px 8px 0 4px',
          border: 'solid 1px rgba(255,255,255,0.4)',
        }}
      >
        <EditIcon style={{ fontSize: '40px' }} />
      </IconButton>

      <IconButton
        style={{
          display: 'block',
          position: 'absolute',
          top: -8,
          right: -8,
          opacity: '.5',
        }}
      >
        <HighlightOffIcon />
      </IconButton>
    </div>
  )
}
export default StickerDataPreview
