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
import Avatar from '@material-ui/core/Avatar'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import * as firebase from 'firebase/app'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import IconButton from '@material-ui/core/IconButton'

import * as CONTENT from '../../../constants/contentTypes'
import FileUploader from '../../shared/Uploader/FileUploader'
import store from '../../../functions/store'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url('/Banners/DesignerBanner.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  subField: {
    // marginBottom: '4rem',
    // marginRight: '2rem',
  },
  subFieldWrapper: {
    paddingRight: '0',
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  fieldWrapper: {
    display: 'flex',
  },
  intFieldSlider: {
    margin: '0 1rem',
  },
  subSectionElementWrapper: {
    margin: '0 1rem 1rem 0',
    padding: '1rem',
    position: 'relative',
  },
  subFieldDelete: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
  },
}))

const ContentSubFieldSection = props => {
  const { contentType, contentId, data, onChange, format, reformat } = props
  const classes = useStyles()

  const [cData, setCData] = useState(format && data ? format(data) : data)

  const changeHandler = (uid, id, value) => {
    const orig_data = reformat([...cData])
    orig_data[uid][id] = value
    onChange(orig_data)
    setCData(format(orig_data))
  }

  const addNewElement = () => {
    const xdata = CONTENT[contentType].format.adminDefault()
    const ydata = [...cData, xdata]
    setCData(ydata)
  }

  const removeElement = id => {
    const orig_data = reformat([...cData])
    const keys = Object.keys(orig_data)
    const xdata = {}
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] !== id) {
        xdata[keys[i]] = { ...orig_data[keys[i]] }
      }
    }
    const ydata = format(xdata)
    setCData(ydata)
    onChange(xdata)
  }

  return (
    <>
      {cData.map(i => (
        <Paper className={classes.subSectionElementWrapper} key={i.uid}>
          <Table className={classes.subField} size="small">
            <TableBody>
              {CONTENT[contentType].fields.map(el => {
                return (
                  <ContentFieldEdit
                    uid={i.uid}
                    data={i[el.id]}
                    {...el}
                    key={`${i.uid}${el.id}`}
                    contentType={contentType}
                    onChange={changeHandler}
                    subContent
                  />
                )
              })}
            </TableBody>
          </Table>
          <IconButton
            className={classes.subFieldDelete}
            onClick={() => removeElement(i.uid)}
          >
            <HighlightOffIcon />
          </IconButton>
        </Paper>
      ))}
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={addNewElement}
      >
        Add new {contentType}
      </Button>
    </>
  )
}

const ContentFieldEdit = props => {
  const {
    uid,
    id,
    label,
    type,
    data,
    editable,
    onChange,
    mainContentType,
    subContent,
    path,
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
    if (onChange) {
      if (subContent) {
        onChange(uid, id, cData)
      } else {
        onChange(id, cData)
      }
    }
  }, [cData])

  return editable && cData !== undefined ? (
    <TableRow>
      <TableCell align="right" style={{ borderBottom: 'none' }}>
        {label}
      </TableCell>
      <TableCell
        className={type === 'content' ? classes.subFieldWrapper : null}
        style={{ borderBottom: 'none' }}
      >
        {['string', 'int', 'uid'].includes(type) ? (
          type === 'int' ? (
            <div className={classes.fieldWrapper}>
              <TextField
                id={`${uid}${label}`}
                value={cData}
                variant="outlined"
                size="small"
                disabled
                style={{ width: '80px' }}
              />
              <Slider
                className={classes.intFieldSlider}
                value={cData}
                step={props.step}
                marks
                min={props.min}
                max={props.max}
                valueLabelDisplay="on"
                onChange={(e, i) => {
                  setCData(i)
                }}
              />
            </div>
          ) : (
            <TextField
              id={`${uid}${label}`}
              value={cData}
              variant="standard"
              size="small"
              fullWidth
              onChange={e => {
                const xdata = e.target.value
                setCData(xdata)
              }}
              style={
                type === 'uid'
                  ? { fontFamily: '"Lucida Console", Monaco, monospace' }
                  : null
              }
            />
          )
        ) : type === 'stringList' ? (
          <Select
            id={`${uid}${label}`}
            value={data}
            fullWidth
            variant="standard"
            size="small"
            onChange={e => setCData(e.target.value)}
          >
            {props.options.map(el => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        ) : type === 'timestamp' ? (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              value={cData.toDate()}
              fullWidth
              inputVariant="standard"
              showTodayButton
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
          />
        ) : type === 'image' ? (
          <div className={classes.avatarWrapper}>
            <Avatar alt="User Avatar" src={filePath} />
            <FileUploader
              path={path}
              text={cData ? `Change ${label}` : `Add ${label}`}
              variant="outlined"
              then={i => {
                CONTENT[mainContentType].element.update(uid, null, { [id]: i })
                setCData(i)
              }}
              drop={cData && cData}
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
            data={cData}
            contentType={props.content.ID}
            contentId={props.id}
            onChange={setCData}
            format={props.format}
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
        style={
          type === 'uid'
            ? {
                borderBottom: 'none',
                fontFamily: '"Lucida Console", Monaco, monospace',
              }
            : { borderBottom: 'none' }
        }
      >
        {['string', 'int', 'uid', 'stringList'].includes(type) ? (
          data
        ) : type === 'timestamp' ? (
          data ? (
            moment(data.toDate()).format('YYYY MM DD LT')
          ) : null
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

export default ContentFieldEdit
