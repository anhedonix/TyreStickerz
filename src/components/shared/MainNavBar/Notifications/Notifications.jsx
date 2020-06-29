import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React, { useState, useContext, useEffect } from 'react'

import NotificationsDialog from './NotificationsDialog/NotificationsDialog'
import * as content from '../../../../constants/contentTypes'
import { MainContext } from '../../../../states/mainState'

const Notifications = () => {
  const { state } = useContext(MainContext)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [unread, setUnread] = useState(0)
  const [pNotif, setPNotif] = useState(null)
  const [gNotif, setGNotif] = useState(null)

  /**
   * This is a static docRef function, left here only for refrence
   *
   * useEffect(() => {
   *   setPNotif(null)
   *   if (state.user) {
   *     store
   *       .getContent(CONTENT.notif, state.user.uid)
   *       .then(data => setPNotif(data))
   *       .catch(reason => console.log(reason))
   *   }
   * }, [state.user])
   *
   */

  useEffect(() => {
    if (state.user) {
      setPNotif(state.userData['notifications'])
    }
  }, [state])

  useEffect(() => {
    let unsubscribe
    content.notifications_global
      .readSnap(setGNotif)
      .then(unsub => (unsubscribe = unsub))
    return unsubscribe
  }, [])

  useEffect(() => {
    checkUnread()
  }, [pNotif])

  const checkUnread = () => {
    setUnread(0)
    if (pNotif) {
      let count = 0
      Object.keys(pNotif).map(key => {
        if (pNotif[key].read === false) count++
      })
      setUnread(count)
    }
  }

  const handleClick = e => {
    setOpen(true)
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Badge badgeContent={unread} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <NotificationsDialog
        open={open}
        onClose={handleClose}
        anchor={anchorEl}
        data={{ personal: pNotif, global: gNotif }}
      />
    </>
  )
}

export default Notifications
