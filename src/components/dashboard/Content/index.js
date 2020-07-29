import react, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ButtonGroup from '@material-ui/core/ButtonGroup'
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
    if (contentId !== 'create') {
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
    } else {
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].editable) {
          xdata[fields[i].id] = data[fields[i].id]
        }
      }
      CONTENT[contentType].element.create(xdata).then(result => {
        setIsEdited(false)
        setEditMode(false)
        setData(cData)
        router.push(
          '/dashboard/[contentType]/[contentId]',
          `/dashboard/${contentType}/${result}`
        )
      })
    }
  }

  return loading ? (
    <div className={classes.root}>
      <Loader />
    </div>
  ) : data ? (
    <div className={classes.root}>
      <Paper square className={classes.contentToolbar}>
        <ButtonGroup>
          {CONTENT[contentType].extra.adminActions.includes('update') && (
            <Button
              className={classes.editButton}
              variant="outlined"
              onClick={() => {
                setEditMode(!editMode)
                setIsEdited(false)
                contentId === 'create' &&
                  router.push(
                    '/dashboard/[contentType]',
                    `/dashboard/${contentType}`
                  )
              }}
            >
              {editMode ? 'Discard' : 'Edit'}
            </Button>
          )}
          {CONTENT[contentType].extra.adminActions.includes('delete') &&
            contentId !== 'create' && (
              <Button
                className={classes.editButton}
                variant="outlined"
                onClick={() => {
                  setEditMode(!editMode)
                  setIsEdited(false)
                  contentId === 'create' &&
                    router.push(
                      '/dashboard/[contentType]',
                      `/dashboard/${contentType}`
                    )
                }}
              >
                Delete
              </Button>
            )}
          {isEdited && (
            <Button
              className={classes.saveButton}
              variant="contained"
              onClick={() => saveData(cData)}
            >
              {contentId === 'create' ? 'Create' : 'Save'}
            </Button>
          )}
        </ButtonGroup>
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
