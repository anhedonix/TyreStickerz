import * as app from 'firebase/app'
import config from '../config/firebase.js'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/performance'

if (!app.apps.length) {
  app.initializeApp(config)
}

export default app.app()

// export const analytics = app.analytics()
export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
// export const performance = app.performance()
