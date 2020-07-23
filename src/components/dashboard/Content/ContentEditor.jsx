import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'

import * as CONTENT from '../../../constants/contentTypes'
import ContentFieldEdit from './ContentFieldEdit'

const ContentEditor = props => {
  const { data, contentType, contentId } = props

  const [cData, setCData] = useState(data)

  const onChange = (id, value) => {
    setCData({ ...cData, [id]: value })
  }

  const TableBg = props => <Paper square {...props} />

  return (
    <Table>
      <TableBody>
        {CONTENT[contentType].fields.map(el => {
          const render = (
            <ContentFieldEdit
              contentType={contentType}
              uid={contentId}
              data={data[el.id]}
              {...el}
              key={el.id}
              onChange={onChange}
            />
          )

          return render
        })}
      </TableBody>
    </Table>
  )
}

export default ContentEditor
