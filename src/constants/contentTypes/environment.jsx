import React from 'react'
import PanoramaIcon from '@material-ui/icons/Panorama'

import crud from '../../functions/crud'

const content = {
  ID: 'environment',
  label: 'Environment',
  token: 'doc:Environments',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    {
      id: 'px',
      label: 'Positive X-Axis',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'py',
      label: 'Positive Y-Axis',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'pz',
      label: 'Positive Z-Axis',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'nx',
      label: 'Negative X-Axis',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'ny',
      label: 'Negative Y-Axis',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'nz',
      label: 'Negative Z-Axis',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'pano',
      label: 'Pano',
      editable: true,
      type: 'file',
      format: '.hdr',
      path: 'Environments',
    },
    {
      id: 'pano_thumb',
      label: 'Pano Thumbnail',
      editable: true,
      type: 'image',
      path: 'Environments',
    },
  ],
  format: {
    default: () => {
      return {
        name: '',
        px: null,
        py: null,
        pz: null,
        nx: null,
        ny: null,
        nz: null,
        pano: null,
        pano_thumb: null,
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
