import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { v4 as uuid } from 'uuid'
import crud from '../../functions/crud'

const content = {
  ID: 'accessories',
  label: 'Accessories',
  token: 'doc:Accessories',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    {
      id: 'model',
      label: 'Model',
      editable: true,
      type: 'file',
      format: '.glb',
      path: 'Models/Accessories',
    },
  ],
  format: {
    default: () => {
      return {
        name: '',
        model: '',
      }
    },
    adminDefault: () => {
      return {
        uid: uuid(),
        name: '',
        autoLoad: true,
        model: null,
      }
    },
    contentListStruct: data => {
      return {
        detail: data.description,
        header: data.name,
        meta2: data.category,
        suffix: { type: 'image', value: data.image },
        uid: data.uid,
      }
    },
  },
}

content.extra = {
  icon: <AddCircleOutlineIcon />,
  adminActions: ['create', 'update', 'delete'],
}

const sticker_graphics = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default sticker_graphics
