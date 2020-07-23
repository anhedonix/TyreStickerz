import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'

import { makeStyles } from '@material-ui/core/styles'
import * as CONTENT from '../../../constants/contentTypes'
import MainContext from '../../../states/mainState'
import store from '../../../functions/store'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/Banners/DesignerBanner.png')`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  subField: {
    marginBottom: '1rem',
    borderLeft: '1px solid rgba(128,128,128,0.5)',
    borderTop: '1px solid rgba(128, 128, 128, 0.5)',
  },
  subFieldWrapper: {
    paddingRight: '0',
  },
}))

const ContentSubFieldSection = props => {
  const { contentType, data } = props
  const classes = useStyles()
  return (
    <>
      {data.map(i => (
        <Table className={classes.subField} size="small" key={i.uid}>
          <TableBody>
            {CONTENT[contentType].fields.map(el => {
              return <ContentFieldView data={i[el.id]} {...el} key={el.id} />
            })}
          </TableBody>
        </Table>
      ))}
    </>
  )
}

const ContentFieldView = props => {
  const { id, label, type, data } = props
  const [cData, setCData] = useState()

  const classes = useStyles()

  useEffect(() => {
    if (type === 'image' && data) {
      store
        .getFileUrl(data)
        .then(url => setCData(url))
        .catch(err => console.log(err))
    } else {
      setCData(null)
    }
  }, [])

  return (
    <TableRow>
      <TableCell align="right">{label}</TableCell>
      <TableCell
        className={type === 'content' ? classes.subFieldWrapper : null}
      >
        {['string', 'int', 'uid'].includes(type) ? (
          data
        ) : type === 'timestamp' ? (
          moment(data.toDate()).format('YYYY MM DD LT')
        ) : type === 'bool' ? (
          data ? (
            'true'
          ) : (
            'false'
          )
        ) : type === 'image' ? (
          <Avatar alt="User Avatar" src={cData} />
        ) : type === 'content' ? (
          <ContentSubFieldSection
            data={props.format(data)}
            contentType={props.content.ID}
          />
        ) : null}
      </TableCell>
    </TableRow>
  )
}

export default ContentFieldView
