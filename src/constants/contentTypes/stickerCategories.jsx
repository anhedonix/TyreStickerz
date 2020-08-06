import React from 'react'
import moment from 'moment'
import CategoryIcon from '@material-ui/icons/Category'
import * as firebase from 'firebase/app'

import crud from '../../functions/crud'

const content = {
  ID: 'sticker_categories',
  label: 'Sticker Categories',
  token: 'metaField:_meta/StickerCategories/categories',

  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'string' },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    { id: 'description', label: 'Description', editable: true, type: 'string' },
  ],
  format: {
    default: () => {
      return {
        name: '',
        description: '',
      }
    },
    contentListStruct: data => {
      return {
        header: data.name,
        detail: data.description.substring(0, 30),
        uid: data.uid,
      }
    },
  },
}
content.extra = {
  icon: <CategoryIcon />,
  adminActions: ['create', 'update'],
}

const sticker_categories = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default sticker_categories
