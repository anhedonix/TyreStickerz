import React from 'react'
import { auth } from 'firebase/app'
import PeopleIcon from '@material-ui/icons/People'
import * as USER from '../../constants/user'
import notification from './notification'
import store from '../../functions/store'
import crud from '../../functions/crud'

const content = {
  ID: 'user',
  label: 'User',
  token: 'doc:users',
  extra: {
    icon: <PeopleIcon />,
    adminURL: 'users:uid',
  },
  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'uid' },
    { id: 'firstName', label: 'First Name', editable: true, type: 'string' },
    { id: 'lastName', label: 'Last Name', editable: true, type: 'string' },
    { id: 'email', label: 'E-Mail', editable: true, type: 'string' },
    { id: 'darkUI', label: 'Dark Theme', editable: true, type: 'bool' },
    {
      id: 'messageTimeOut',
      label: 'Message Timeout (secs)',
      editable: true,
      type: 'int',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      editable: true,
      type: 'content',
      content: notification,
      format: input => {
        const data = []
        Object.keys(input).map(i => data.push({ ...input[i], uid: i }))
        return data
      },
    },
  ],
  format: {
    default: () => {
      return {
        firstName: '',
        lastName: '',
        email: '',
        darkUI: false,
        messageTimeOut: 6,
        type: USER.CLIENT,
      }
    },
    contentListStruct: data => {
      return {
        header: data.firstName + ' ' + data.lastName,
        detail: data.uid,
        meta1: data.type,
        meta2: data.email,
        uid: data.uid,
      }
    },
  },
}

content.extra = {
  icon: <PeopleIcon />,
  adminURL: [
    { type: 'uid', content: content },
    { type: 'contentType', content: notification },
  ],
}

const currentUserCrud = type => {
  if (auth() && auth().currentUser) {
    const uid = auth().currentUser.uid
    return {
      /**
       * Read current user
       */
      read: () => store.readContent(type, uid),

      /**
       * Read user snapshot.
       * @param {Function} SetterFunction Function to run with data
       */
      readSnap: fn => store.readContentSnapshot(type, fn, uid),

      /**
       * Update user
       * @param {string} Key Item to be updated.
       * @param {Object} Payload the data that is to be stored.
       */
      update: (key, payload = undefined) =>
        store.updateContent(type, auth().currentUser.uid, key, payload),
    }
  } else {
    return {}
  }
}

const user = {
  ...content,
  ...crud(content),
  currentUser: () => currentUserCrud(content),
}

export default user
