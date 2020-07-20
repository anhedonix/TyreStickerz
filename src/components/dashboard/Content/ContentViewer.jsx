import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

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
            <ContentFieldView data={data[el.id]} {...el} key={el.id} />
          ))}
      </TableBody>
    </Table>
  )
}

export default ContentViewer
