import React from 'react'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'

import crud from '../../functions/crud'
import * as stickerCategories from './../stickerCategories'

const content = {
  ID: 'environment_map',
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
      path: 'Environments/:uid/px',
    },
    {
      id: 'py',
      label: 'Positive Y-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments/:uid/py',
    },
    {
      id: 'pz',
      label: 'Positive Z-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments/:uid/pz',
    },
    {
      id: 'nx',
      label: 'Negative X-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments/:uid/px',
    },
    {
      id: 'ny',
      label: 'Negative Y-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments/:uid/py',
    },
    {
      id: 'nz',
      label: 'Negative Z-Axis',
      editable: true,
      type: 'file',
      format: '.exr',
      path: 'Environments/:uid/pz',
    },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
  ],
  format: {
    default: () => {
      return {
        image: null,
        name: '',
        description: '',
        category: '',
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
  icon: <PhotoLibraryIcon />,
  adminActions: ['create', 'update', 'delete'],
}

const sticker_graphics = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default sticker_graphics
