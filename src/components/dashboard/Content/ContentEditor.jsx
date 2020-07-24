import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import isEqual from 'lodash/isEqual'
import * as CONTENT from '../../../constants/contentTypes'
import ContentFieldEdit from './ContentFieldEdit'

const ContentEditor = props => {
  const { data, contentType, contentId } = props

  const [cData, setCData] = useState({ ...data })
  const [edited, setEdited] = useState(false)

  const onChange = (id, value) => {
    setCData({ ...cData, [id]: value })
  }

  useEffect(() => {
    if (!isEqual(cData, data)) {
      setEdited(true)
    } else {
      setEdited(false)
    }
    console.log(cData)
  }, [cData])

  return (
    <Table>
      <TableBody>
        {CONTENT[contentType].fields.map(el => {
          const render = (
            <ContentFieldEdit
              mainContentType={contentType}
              uid={contentId}
              data={cData[el.id]}
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
