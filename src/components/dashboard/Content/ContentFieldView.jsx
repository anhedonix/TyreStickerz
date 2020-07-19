import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'

const ContentFieldView = props => {
  const { id, label, type, data } = props
  console.log(data)
  return (
    <TableRow>
      <TableCell align="right">{label}</TableCell>
      <TableCell>
        {type === 'string'
          ? data[id]
          : type === 'uid'
          ? data[id]
          : type === 'timestamp'
          ? moment(data.timestamp.toDate()).format('YYYY MM DD LT')
          : null}
      </TableCell>
    </TableRow>
  )
}

export default ContentFieldView
