import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import Switch from '@material-ui/core/Switch'

import * as CONTENT from '../../../constants/contentTypes'
import FileUploader from '../../shared/Uploader/FileUploader'
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
  },
  subFieldWrapper: {
    paddingRight: '0',
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

const ContentSubFieldSection = props => {
  const { contentType, data, onChange, reformat } = props
  const classes = useStyles()

  const [cData, setCData] = useState(data)

  const changeHandler = (id, value) => {
    onChange(contentType, reformat(cData))
  }

  return (
    <>
      {cData.map(i => (
        <Table className={classes.subField} size="small" key={i.uid}>
          <TableBody>
            {CONTENT[contentType].fields.map(el => {
              return (
                <ContentFieldView
                  uid={i.uid}
                  data={i[el.id]}
                  {...el}
                  key={`${i.uid}${el.id}`}
                  onChange={changeHandler}
                />
              )
            })}
          </TableBody>
        </Table>
      ))}
    </>
  )
}

const ContentFieldView = props => {
  const {
    uid,
    id,
    label,
    type,
    data,
    editable,
    onChange,
    contentType,
    mainContentType,
  } = props

  const [cData, setCData] = useState(data)
  const [filePath, setFilePath] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    if (type === 'image' && cData !== null) {
      store
        .getFileUrl(cData)
        .then(url => setFilePath(url))
        .catch(err => console.log(err))
    }
    if (cData === null) {
      setFilePath(null)
    }
  }, [cData])

  useEffect(() => {
    if (onChange) {
      if (type === 'content') {
        onChange(id, cData)
      } else {
        onChange(id, cData)
      }
    }
  }, [cData])

  return editable ? (
    <TableRow>
      <TableCell align="right" style={{ borderBottom: 'none' }}>
        {label}
      </TableCell>
      <TableCell
        className={type === 'content' ? classes.subFieldWrapper : null}
        style={{ borderBottom: 'none' }}
      >
        {['string', 'int', 'uid'].includes(type) ? (
          <TextField
            id={`${uid}${label}`}
            value={cData}
            onChange={e =>
              setCData(
                type === 'int' ? parseInt(e.target.value) : e.target.value
              )
            }
            fullWidth
          />
        ) : type === 'timestamp' ? (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              value={cData.toDate()}
              fullWidth
              onChange={e =>
                setCData(firebase.firestore.Timestamp.fromDate(e.toDate()))
              }
            />
          </MuiPickersUtilsProvider>
        ) : type === 'bool' ? (
          <Switch
            checked={cData}
            onChange={e => setCData(e.target.checked)}
            name={label}
            /* disabled={!editable} */
          />
        ) : type === 'image' ? (
          <div className={classes.avatarWrapper}>
            <Avatar alt="User Avatar" src={filePath} />
            <FileUploader
              path={label}
              text={cData ? `Change ${label}` : `Add ${label}`}
              variant="outlined"
              then={i => {
                CONTENT[mainContentType].element.update(uid, null, { [id]: i })
                setCData(i)
              }}
              drop={cData && cData}
              /* className={classes.avatarButton} */
              dropButton={cData}
              dropThen={() => {
                CONTENT[mainContentType].element.update(uid, null, {
                  [id]: null,
                })
                setCData(null)
              }}
            />
          </div>
        ) : type === 'content' ? (
          <ContentSubFieldSection
            data={props.format(data)}
            contentType={props.content.ID}
            onChange={setCData}
            reformat={props.reformat}
          />
        ) : null}
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell align="right" style={{ borderBottom: 'none' }}>
        {label}
      </TableCell>
      <TableCell
        className={type === 'content' ? classes.subFieldWrapper : null}
        style={{ borderBottom: 'none' }}
      >
        {['string', 'int', 'uid'].includes(type) ? (
          data
        ) : type === 'timestamp' ? (
          moment(data.toDate()).format('YYYY MM DD LT')
        ) : type === 'bool' ? (
          <Switch checked={cData} onChange={() => {}} name={label} disabled />
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
