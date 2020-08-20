import React from 'react'
import { auth } from 'firebase/app'
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift'

import * as USER from '../../constants/user'
import accessories from './accessories'
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
      id: 'bolts',
      label: 'Bolt Pattern',
      editable: true,
      type: 'int',
      min: 4,
      max: 5,
      step: 1,
    },
    {
      id: 'model',
      label: 'Model',
      editable: true,
      type: 'file',
      format: '.glb',
      path: 'Models/Rims',
    },
    {
      id: 'accessories',
      label: 'Accessories',
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
        bolts: 4,
        model: '',
        accessories: null,
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

accessories.read().then(data => {
  const options = []
  data.map(el => {
    options.push(el.uid)
  })
  rim.fields[6].options = options
})

export default rim
