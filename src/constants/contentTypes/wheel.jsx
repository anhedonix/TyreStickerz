import React from 'react'
import { auth } from 'firebase/app'
import AlbumIcon from '@material-ui/icons/Album'

import crud from '../../functions/crud'
import * as RIMSIZES from '../../constants/rim'
import rims from './rims'

const content = {
  ID: 'wheel',
  label: 'Wheel',
  token: 'doc:Wheels',
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
      id: 'tyre',
      label: 'Tyre',
      editable: true,
      type: 'file',
      format: '.glb',
      path: 'Models/Tyre',
    },
    {
      id: 'stickerMesh',
      label: 'Sticker Mesh',
      editable: true,
      type: 'file',
      format: '.sdsm',
      path: 'Models/StickerMesh',
    },
    {
      id: 'rim',
      label: 'Default Rim',
      editable: true,
      type: 'stringList',
      enableDefault: true,
      options: [],
    },
  ],
  format: {
    default: () => {
      return {
        name: '',
        image: '',
        size: RIMSIZES.$20,
        tyre: null,
        stickerMesh: null,
        rim: null,
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
  icon: <AlbumIcon />,
  adminActions: ['create', 'update', 'delete'],
}

const wheel = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

rims.read().then(data => {
  const options = []
  data.map(el => {
    options.push(el.uid)
  })
  wheel.fields[6].options = options
})

export default wheel
