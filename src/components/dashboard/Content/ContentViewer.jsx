import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import * as CONTENT from '../../../constants/contentTypes'
import ContentFieldView from './ContentFieldView'

const ContentViewer = props => {
  const { data, contentType, contentId } = props

  return (
    <Table>
      <TableBody>
        {contentType &&
          contentId &&
          CONTENT[contentType].fields.map(el => (
            <ContentFieldView data={data} {...el} key={el.id} />
          ))}
      </TableBody>
    </Table>
  )
}

export default ContentViewer
