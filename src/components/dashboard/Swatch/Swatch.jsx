import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Link from 'next/Link'
import { useRouter } from 'next/router'

const Swatch = props => {
  const router = useRouter()
  const { contentType, contentId } = router.query
  return (
    <>
      <Link
        href="/dashboard/[contentType]/[contentId]"
        as={`/dashboard/${contentType}/${props.uid}`}
      >
        <ListItem button selected={contentId === props.uid}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
              >
                <Grid item>
                  <Typography variant="h5">{props.header}</Typography>
                </Grid>
                <Grid item>{props.detail}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
              >
                <Grid item>{props.meta1}</Grid>
                <Grid item>{props.meta2}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </Link>
      <Divider />
    </>
  )
}

export default Swatch
