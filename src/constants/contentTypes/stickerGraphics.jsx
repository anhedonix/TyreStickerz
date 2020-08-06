import React from 'react'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'

import crud from '../../functions/crud'
import stickerCategories from './stickerCategories'

const content = {
  ID: 'sticker_graphics',
  label: 'Sticker Graphics',
  token: 'collection:StickerGraphics',
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
      options: async () => {
        const data = []
        await stickerCategories.read(null).then(el =>
          el.map(i => {
            data.push({ id: i.uid, name: i.name, detail: i.description })
          })
        )
        return data
      },
    },
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
  adminActions: ['create', 'update', 'delete'],
}

const sticker_graphics = {
  ...content,
  ...crud(content),
  element: { ...crud(content), ...content },
}

export default sticker_graphics
