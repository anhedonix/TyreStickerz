import React from 'react'
import DescriptionIcon from '@material-ui/icons/Description'

import crud from '../../functions/crud'
import environment from './environment'
import rims from './rims'
import wheel from './wheel'
import accessories from './accessories'

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
    {
      id: 'acc',
      label: 'Accessories',
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

wheel.read().then(data => {
  const options = []
  data.map(el => {
    options.push(el.uid)
  })
  defaults.fields[2].options = options
})

accessories.read().then(data => {
  const options = []
  data.map(el => {
    options.push(el.uid)
  })
  defaults.fields[3].options = options
})

export default defaults
