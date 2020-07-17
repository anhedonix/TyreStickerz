import React from 'react'
import crud from '../../functions/crud'
import moment from 'moment'
import NotificationsIcon from '@material-ui/icons/Notifications'
import notif from './notification'

const content = {
  ID: 'notifications_global',
  label: 'Notifications',
  token: 'metaField:_meta/GlobalNotifications/notifications',

  fields: [
    { id: 'uid', label: 'UID', editable: false, type: 'string' },
    { id: 'message', label: 'Message', editable: true, type: 'string' },
    { id: 'link', label: 'Link', editable: true, type: 'string' },
    { id: 'timestamp', label: 'Date/Time', editable: true, type: 'timestamp' },
  ],
  format: {
    default: () => {
      return {
        message: '',
        link: '',
        timestamp: moment().toDate(),
      }
    },
    contentListStruct: data => {
      return {
        header: data.message.substring(0, 20) + '...',
        detail: data.uid,
        meta1: moment(data.timestamp.toDate()).format('YY MM DD LT'),
        uid: data.uid,
      }
    },
  },
}
content.extra = {
  icon: <NotificationsIcon />,
  adminURL: [
    { type: 'contentType', content: content, token: 'notifications_global' },
    { type: 'uid', content: notif },
  ],
}

const notifications_global = { ...content, ...crud(content) }

export default notifications_global
