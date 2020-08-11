import React from 'react'
import { auth } from 'firebase/app'
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift'

import * as USER from '../../constants/user'
import model from './rim_model'
import crud from '../../functions/crud'
import * as RIMSIZES from '../../constants/rim'

const content = {
  ID: 'rims',
  label: 'Rims',
  token: 'doc:Rims',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    {
      id: 'image',
      label: 'Preview',
      editable: true,
      type: 'image',
      path: 'thumbs/rims',
    },
    {
      id: 'size',
      label: 'Size (inch)',
      editable: true,
      type: 'stringList',
      options: [...RIMSIZES.TYPES],
    },
    {
      id: 'model',
      label: 'Model',
      editable: true,
      type: 'content',
      content: model,
      format: input => {
        const data = []
        if (input) {
          Object.keys(input).map(i => data.push({ ...input[i], uid: i }))
        }
        return data
      },
      reformat: input => {
        const data = {}
        if (input) {
          input.map(el => {
            const { uid, ...vals } = { ...el }
            data[uid] = { ...vals }
          })
        }
        return data
      },
    },
  ],
  format: {
    default: () => {
      return {
        name: '',
        image: '',
        size: RIMSIZES.$20,
        model: {},
      }
    },
    contentListStruct: data => {
      return {
        detail: data.uid,
        header: data.name,
        meta1: undefined,
        meta2: data.type,
        uid: data.uid,
      }
    },
  },
}

content.extra = {
  icon: <FilterTiltShiftIcon />,
  adminActions: ['create', 'update', 'delete'],
}

const rim = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default rim
