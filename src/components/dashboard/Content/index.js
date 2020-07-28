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
    display: 'flex',
    justifyContent: 'flex-end',
  },
  editButton: {
    display: 'block',
  },
  saveButton: {
    marginLeft: '1rem',
  },
}))

const Content = () => {
  const [editMode, setEditMode] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [data, setData] = useState()
  const [cData, setCData] = useState()
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { contentType, contentId } = router.query

  const classes = useStyles()

  useEffect(() => {
    let unsubscribe
    setLoading(true)
    setEditMode(false)
    setData()
    if (contentType && contentId && contentId !== 'create') {
      CONTENT[contentType].element.readSnap(setData, contentId).then(i => {
        unsubscribe = i
        setLoading(false)
      })
    } else if (contentType && contentId === 'create') {
      setLoading(false)
      setEditMode(true)
      setData(CONTENT[contentType].element.format.default())
    } else {
      setLoading(false)
    }
    return unsubscribe
  }, [contentType, contentId])

  const saveData = data => {
    const xdata = {}
    const fields = CONTENT[contentType].fields
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].editable) {
        xdata[fields[i].id] = data[fields[i].id]
      }
    }
    CONTENT[contentType].element.update(contentId, null, xdata).then(() => {
      setIsEdited(false)
      setEditMode(false)
      setData(cData)
    })
  }

  return loading ? (
    <div className={classes.root}>
      <Loader />
    </div>
  ) : data ? (
    <div className={classes.root}>
      <Paper square className={classes.contentToolbar}>
        <Button
          className={classes.editButton}
          variant="outlined"
          onClick={() => {
            setEditMode(!editMode)
            setIsEdited(false)
          }}
        >
          {editMode ? 'Discard' : 'Edit'}
        </Button>
        {isEdited && (
          <Button
            className={classes.saveButton}
            variant="contained"
            onClick={() => saveData(cData)}
          >
            Save
          </Button>
        )}
      </Paper>
      {editMode ? (
        <ContentEditor
          data={data}
          contentType={contentType}
          contentId={contentId}
          isEdited={setIsEdited}
          currentData={setCData}
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
