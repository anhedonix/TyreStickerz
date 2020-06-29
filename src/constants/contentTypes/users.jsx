import React from 'react'
import PeopleIcon from '@material-ui/icons/People'

import crud from '../../functions/crud'
import user from './user'

const content = {
  ID: 'users',
  label: 'Users',
  token: 'collection:users',
}

content.extra = {
  icon: <PeopleIcon />,
  adminURL: [
    { type: 'contentType', content: content, token: 'users' },
    { type: 'uid', content: user },
  ],
}

const users = { ...content, ...crud(content) }

export default users
