import React from 'react'
import PanoramaIcon from '@material-ui/icons/Panorama'

import crud from '../../functions/crud'

const content = {
  ID: 'environment',
  label: 'Environment',
  token: 'doc:Environments',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    {
      id: 'px',
      label: 'Positive X-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments',
    },
    {
      id: 'py',
      label: 'Positive Y-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments',
    },
    {
      id: 'pz',
      label: 'Positive Z-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments',
    },
    {
      id: 'nx',
      label: 'Negative X-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments',
    },
    {
      id: 'ny',
      label: 'Negative Y-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments',
    },
    {
      id: 'nz',
      label: 'Negative Z-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments',
    },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
  ],
  format: {
    default: () => {
      return {
        px: null,
        py: null,
        pz: null,
        nx: null,
        ny: null,
        nz: null,
        name: '',
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
