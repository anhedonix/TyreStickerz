import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TyrePreview from './TyrePreview'

const useStyles = makeStyles(theme => ({}))
const previewValues = { size: 350, thickness: 9 }
const StickerCardEditMode = props => {
  const classes = useStyles()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexGrow: '1',
        justifyContent: 'flex-start',
      }}
    >
      <TyrePreview data={props.data} {...previewValues} />
      <div></div>
    </div>
  )
}

export default StickerCardEditMode
