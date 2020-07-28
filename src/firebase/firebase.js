import * as app from 'firebase/app'
import config from '../config/firebase.js'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/performance'

// let analytics

if (!app.apps.length) {
  app.initializeApp(config)
  // if (typeof window !== 'undefined') {
  // if ('measurementId' in clientCredentials) analytics = app.analytics()
  // }
}

export default app.app()

// export { analytics }

const auth = app.auth()

const firestore = app.firestore()
firestore.enablePersistence()

const storage = app.storage()

// export const performance = app.performance()

export { auth, firestore, storage }
