import React from 'react'
import { auth } from 'firebase/app'
import DescriptionIcon from '@material-ui/icons/Description'

import * as USER from '../../constants/user'
import model from './rim_model'
import crud from '../../functions/crud'
import * as RIMSIZES from '../../constants/rim'
import environment from './environment'
import rims from './rims'

const content = {
  ID: 'defaults',
  label: 'Defaults',
  token: 'defaults:_meta/Defaults/Defaults',
  fields: [
    {
      id: 'env',
      label: 'Environment',
      editable: true,
      type: 'stringList',
      options: [],
    },
    {
      id: 'rim',
      label: 'Rim',
      editable: true,
      type: 'stringList',
      options: [],
    },
    {
      id: 'whl',
      label: 'Wheel',
      editable: true,
      type: 'stringList',
      options: [],
    },
  ],
  format: {
    default: () => {
      return {
        env: '',
        rim: '',
        whl: '',
      }
    },
  },
}

content.extra = {
  icon: <DescriptionIcon />,
  adminActions: ['update'],
}

const defaults = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

environment.read().then(data => {
  const options = []
  data.map(el => {
    options.push(el.uid)
  })
  defaults.fields[0].options = options
})

rims.read().then(data => {
  const options = []
  data.map(el => {
    options.push(el.uid)
  })
  defaults.fields[1].options = options
})

export default defaults
