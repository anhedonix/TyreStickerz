import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TyrePreview from './TyrePreview'

const useStyles = makeStyles(theme => ({}))

const StickerCardEditMode = props => {
  const classes = useStyles()
  return (
    <div>
      <TyrePreview data={props.data} />
    </div>
  )
}

export default StickerCardEditMode
