import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import * as CONTENT from '../../constants/contentTypes'
import Loader from '../shared/Loading/Loading'
import Swatch from './Swatch'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(128,128,128,0.5)',
    padding: '0 0rem',
    minWidth: '300px',
    position: 'relative',
  },
  list: {
    padding: '0',
  },
}))

const ContentPalette = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()

  const router = useRouter()
  const { contentType } = router.query
  const classes = useStyles()

  useEffect(() => {
    setLoading(true)
    let unsubscribe
    if (contentType) {
      const currentContent = CONTENT[contentType]
      currentContent.read().then(i => {
        setData(i.map(j => currentContent.format.contentListStruct(j)))
        setLoading(false)
      })
    } else {
      setData([])
      setLoading(false)
    }
    return unsubscribe
  }, [contentType])

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <List className={classes.list}>
          {data.map(i => (
            <Swatch {...i} key={i.uid} />
          ))}
        </List>
      )}
    </div>
  )
}

export default ContentPalette
