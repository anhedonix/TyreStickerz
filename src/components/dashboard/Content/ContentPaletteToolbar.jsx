import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Link from 'next/Link'
import * as CONTENT from '../../../constants/contentTypes'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem',
  },
  list: {
    padding: '0',
  },
}))

const ContentPaletteToolbar = props => {
  const router = useRouter()
  const { contentType } = router.query
  const classes = useStyles()

  const [actions, setActions] = useState([])

  useEffect(() => {
    setActions(CONTENT[contentType].extra.adminActions)
  }, [contentType])

  return (
    <Paper square className={classes.root}>
      {actions.includes('create') && (
        <Link
          href="/dashboard/[contentType]/[create]"
          as={`/dashboard/${contentType}/create`}
        >
          <Button>Create</Button>
        </Link>
      )}
    </Paper>
  )
}

export default ContentPaletteToolbar
