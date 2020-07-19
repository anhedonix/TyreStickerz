import react, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import ContentEditor from './ContentEditor'
import ContentViewer from './ContentViewer'
import Loader from '../../shared/Loading/Loading'
import * as CONTENT from '../../../constants/contentTypes'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    position: 'relative',
  },
  contentToolbar: {
    padding: '0.5rem',
  },
  editButton: {
    marginLeft: 'auto',
    display: 'block',
  },
}))

const Content = () => {
  const [editMode, setEditMode] = useState(false)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { contentType, contentId } = router.query

  const classes = useStyles()

  useEffect(() => {
    setLoading(true)
    if (contentType && contentId) {
      CONTENT[contentType].element.read(contentId).then(i => {
        setData(i)
        setLoading(false)
      })
    } else {
      setLoading(false)
      setData()
    }
  }, [contentType, contentId])

  return loading ? (
    <Loader />
  ) : data ? (
    <div className={classes.root}>
      <Paper square className={classes.contentToolbar}>
        <Button
          className={classes.editButton}
          variant="outlined"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Discard Edits' : 'Edit'}
        </Button>
      </Paper>
      {editMode ? (
        <ContentEditor
          data={data}
          contentType={contentType}
          contentId={contentId}
        />
      ) : (
        <ContentViewer
          data={data}
          contentType={contentType}
          contentId={contentId}
        />
      )}
    </div>
  ) : null
}

export default Content
