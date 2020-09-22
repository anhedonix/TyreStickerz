import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { v4 as uuid } from 'uuid'
import crud from '../../functions/crud'

const content = {
  ID: 'sticker',
  label: 'Sticker',
  token: 'doc:CustomStickers',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    {
      id: 'start',
      label: 'Start',
      editable: true,
      type: 'int',
      min: 0,
      max: 360,
      step: 3,
    },
    {
      id: 'length',
      label: 'Length',
      editable: true,
      type: 'int',
      min: 0,
      max: 360,
      step: 3,
    },
    {
      id: 'offsetU',
      label: 'Offset U',
      editable: true,
      type: 'int',
      min: -1,
      max: 1,
      step: 0.1,
    },
    {
      id: 'offsetV',
      label: 'Offset V',
      editable: true,
      type: 'int',
      min: -1,
      max: 1,
      step: 0.1,
    },
    {
      id: 'scaleU',
      label: 'Scale U',
      editable: true,
      type: 'int',
      min: 0,
      max: 1,
      step: 0.1,
    },
    {
      id: 'scaleV',
      label: 'Scale V',
      editable: true,
      type: 'int',
      min: 0,
      max: 1,
      step: 0.1,
    },
    {
      id: 'mirror',
      label: 'Mirror',
      editable: true,
      type: 'bool',
    },
  ],
  format: {
    default: () => {
      return {
        uid: '',
        start: 45,
        length: 90,
        offsetU: 0,
        offsetV: 0,
        scaleU: 1,
        scaleV: 1,
        mirror: false,
      }
    },
    adminDefault: () => {
      return {
        uid: uuid(),
        start: 45,
        length: 90,
        offsetU: 0,
        offsetV: 0,
        scaleU: 1,
        scaleV: 1,
        mirror: false,
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
