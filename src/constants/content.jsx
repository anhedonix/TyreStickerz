/**
 * File declaring all content types and their methods
 */
import { auth } from 'firebase/app'
import { v4 as uuid } from 'uuid'
import PeopleIcon from '@material-ui/icons/People'
import React from 'react'
import moment from 'moment'
import NotificationsIcon from '@material-ui/icons/Notifications'

import { loremIpsum } from 'lorem-ipsum'

import * as USER from '../constants/user'
import store from '../functions/store'

/**
 * Main CRUD Operations function for all content types
 */
const crud = (type, uid = undefined) => {
  return {
    create: (payload = null) => store.createContent(type, uid, payload),
    read: () => store.readContent(type, uid),
    readSnap: fn => store.readContentSnapshot(type, fn, uid),
    update: (key, payload = undefined) =>
      store.updateContent(type, uid, key, payload),
    delete: key => store.deleteContent(type, uid, key),
  }
}

/**
 * User notification system, requires a user uid, each notification also has
 * its own uuid
 */
const notif = {
  id: 'NOTIFICATION',
  label: 'Notification',
  plural: 'Notifications',
  access: 'field',
  type: 'object',
  token: 'users/notifications',
  fields: [
    { id: 'link', label: 'Link', editable: true, type: 'string' },
    { id: 'message', label: 'Message', editable: true, type: 'string' },
    { id: 'read', label: 'Read', editable: false, type: 'bool' },
    {
      id: 'timestamp',
      label: 'Time Stamp (secs)',
      editable: true,
      type: 'timestamp',
    },
    { id: 'uid', label: 'UID', editable: false, type: 'string' },
  ],
  uid: () => uuid(),
  template: () => {
    return {
      message: '',
      read: false,
      link: null,
      timestamp: moment().toDate(),
    }
  },
  contentStruct: data => {
    return {
      message: data.message,
      link: data.link,
      timestamp: moment(data.timestamp.toDate()).format('LLL'),
    }
  },
}
notif.element = notif
notif.crud = () => crud(notif, auth().currentUser.uid)
notif.markRead = (key, state) => notif.crud().update(key, { read: state })

/**
 * Individual USER that refers to single users, requires an id
 */
const user = {
  id: 'USER',
  label: 'User',
  access: 'doc',
  token: 'users',
  fields: [
    { id: 'firstName', label: 'First Name', editable: true, type: 'string' },
    { id: 'lastName', label: 'Last Name', editable: true, type: 'string' },
    { id: 'email', label: 'E-Mail', editable: false, type: 'string' },
    { id: 'darkUI', label: 'Dark UI', editable: true, type: 'bool' },
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
      type: 'object',
      object: 'notif',
    },
  ],
  template: () => {
    return {
      firstName: loremIpsum().split(' ')[0],
      lastName: loremIpsum().split(' ')[0],
      email:
        loremIpsum().split(' ')[0] + '@' + loremIpsum().split(' ')[0] + '.com',
      darkUI: true,
      messageTimeOut: 6,
      type: USER.USER,
    }
  },
  struct: data => {
    return {
      header: data.firstName + ' ' + data.lastName,
      detail: data.uid,
      meta1: data.type,
      meta2: data.email,
      uid: data.uid,
      path: 'users',
    }
  },
  adminBarStruct: data => {
    return {
      header: data.firstName + ' ' + data.lastName,
      detail: data.email,
    }
  },
  contentStruct: data => {
    const currentUserNotification = []
    Object.keys(data.notifications).map(el =>
      currentUserNotification.push({
        ...data.notifications[el],
        timestamp: moment(data.notifications[el].timestamp.toDate()).format(
          'LLL'
        ),
        uid: el,
      })
    )

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      darkUI: data.darkUI,
      messageTimeOut: data.messageTimeOut,
      type: data.type,
      email: data.email,
      notifications: currentUserNotification,
    }
  },
  adminFields: ['header', 'email'],
}
user.crudCurrentUser = () => crud(user, auth().currentUser.uid)
user.crud = uid => crud(user, uid)

/**
 * USERS content type that refers to all the users on the site
 */
const users = {
  id: 'USER',
  label: 'Users',
  plural: 'Users',
  access: 'collection',
  token: 'users',
  icon: <PeopleIcon />,
  subMenu: undefined,
  adminUrl: 'users',
  adminStruct: data => {
    const tmp = []
    data.forEach(el => tmp.push(user.struct(el)))
    return tmp
  },
}
users.element = user
users.crud = () => crud(users)

/**
 * Global notification object
 */
const notifGlobal = {
  id: 'NOTIFICATION_GLOBAL',
  label: 'Notifications',
  plural: 'Notifications',
  access: 'metaField',
  type: 'object',
  fields: [
    { id: 'message', label: 'Message', editable: true, type: 'string' },
    { id: 'link', label: 'Link', editable: true, type: 'string' },
    { id: 'timestamp', label: 'Time Stamp', editable: true, type: 'timestamp' },
  ],
  token: '_meta/GlobalNotifications/notifications',
  icon: <NotificationsIcon />,
  uid: () => uuid(),
  subMenu: undefined,
  adminUrl: 'notifGlobal',
  template: () => {
    return {
      message: '',
      link: null,
      timestamp: moment().toDate(),
    }
  },
  formatDate: timestamp => {
    const today = moment(new Date()).format('YYYYMMDD')
    const timestamp_local = moment(timestamp.toDate()).format('YYYYMMDD')

    if (timestamp_local === today) {
      return 'Today @ ' + moment(timestamp.toDate()).format('LT')
    } else {
      return moment(timestamp.toDate()).format('YY MM DD')
    }
  },
  struct: data => {
    return {
      header: data.message.substring(0, 20) + '...',
      detail: moment(data.timestamp.toDate()).format('YY MM DD LT'),
      uid: data.uid,
      path: 'notifGlobal',
    }
  },
  adminStruct: data => {
    const tmp = []
    data.forEach(el => tmp.push(notifGlobal.struct(el)))
    return tmp
  },
  adminBarStruct: data => {
    return {
      header: data.message.substring(0, 30) + '...',
      detail: data.uid,
    }
  },
  contentStruct: data => {
    return {
      message: data.message,
      link: data.link,
      timestamp: moment(data.timestamp.toDate()).format('LLL'),
    }
  },
  adminFields: ['header', 'uid'],
}
notifGlobal.element = notifGlobal
notifGlobal.crud = (uid = undefined) => crud(notifGlobal, uid)

const adminContentTypes = [users, notifGlobal]

export { users, user, notif, notifGlobal, adminContentTypes }
