import React from 'react'
import { auth } from 'firebase/app'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'

import * as USER from '../../constants/user'
import notification from './notification'
import store from '../../functions/store'
import crud from '../../functions/crud'
import authentication from '../../functions/user'
import stickerCategories from './stickerCategories'

const content = {
  ID: 'sticker_graphics',
  label: 'Sticker Graphics',
  token: 'doc:StickerGraphics',
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    {
      id: 'image',
      label: 'Image',
      editable: true,
      type: 'image',
      path: 'Stickers/Graphics',
    },
    { id: 'name', label: 'Name', editable: true, type: 'string' },
    { id: 'description', label: 'Description', editable: true, type: 'string' },
    {
      id: 'category',
      label: 'Category',
      editable: true,
      type: 'metaList',
      options: stickerCategories,
    },
  ],
  format: {
    default: () => {
      return {
        image: null,
        name: '',
        description: '',
        category: null,
      }
    },
    contentListStruct: data => {
      return {
        detail: data.description,
        header: data.name,
        meta1: undefined,
        meta2: data.category,
        suffix: { type: 'image', value: data.image },
        uid: data.uid,
      }
    },
  },
}

content.extra = {
  icon: <PhotoLibraryIcon />,
}

const sticker_graphics = {
  ...content,
  ...crud(content),
}

export default sticker_graphics
