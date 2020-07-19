import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'

const ContentFieldView = props => {
  const { id, label, type, data } = props
  return (
    <TableRow>
      <TableCell align="right">{label}</TableCell>
      <TableCell>
        {['string', 'int', 'uid'].includes(type)
          ? data
          : type === 'timestamp'
          ? moment(data.toDate()).format('YYYY MM DD LT')
          : type === 'bool'
          ? data
            ? 'true'
            : 'false'
          : null}
      </TableCell>
    </TableRow>
  )
}

export default ContentFieldView
