import React from 'react'
import * as USER from '../../constants/user'
import crud from '../../functions/crud'
import { v4 as uuid } from 'uuid'
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
