import React from 'react'
import PanoramaIcon from '@material-ui/icons/Panorama'

import { v4 as uuid } from 'uuid'
import crud from '../../functions/crud'

const content = {
  ID: 'rim_model',
  label: 'Rim Model',
  token: 'field:Rims/model',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    { id: 'autoLoad', label: 'Auto Load', editable: true, type: 'bool' },
    {
      id: 'model',
      label: 'Model',
      editable: true,
      type: 'file',
      format: '.glb',
      path: 'Models/Rims',
    },
  ],
  format: {
    default: () => {
      return {
        name: '',
        model: null,
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
  icon: <PanoramaIcon />,
  adminActions: ['create', 'update', 'delete'],
}

const sticker_graphics = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default sticker_graphics
