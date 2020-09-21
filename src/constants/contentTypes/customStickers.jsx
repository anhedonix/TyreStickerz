import React from 'react'
import LabelIcon from '@material-ui/icons/Label'

import { v4 as uuid } from 'uuid'
import crud from '../../functions/crud'
import sticker from './sticker'

const content = {
  ID: 'customStickers',
  label: 'Custom Stickers',
  token: 'doc:CustomStickers',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    {
      id: 'data',
      label: 'Sticker Data',
      editable: true,
      type: 'content',
      content: sticker,
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
        data: [],
      }
    },
    adminDefault: () => {
      return {
        uid: uuid(),
        name: '',
        autoLoad: true,
      }
    },
    contentListStruct: data => {
      return {
        detail: data.description,
        header: data.name,
        meta2: data.category,
        uid: data.uid,
      }
    },
  },
}

content.extra = {
  icon: <LabelIcon />,
  adminActions: ['create', 'update', 'delete'],
}

const customStickers = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default customStickers
