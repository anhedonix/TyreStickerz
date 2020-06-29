import store from './store'

/**
 * CRUD Function based on different content types
 * @param { type } contentType object type.
 */
const crud = type => {
  return {
    /**
     * Create content
     * @param {Object} Payload the data that is to be stored.
     * @param {string} UID optional ID that has to be used.
     */
    create: (payload, uid = null) => store.createContent(type, uid, payload),

    /**
     * Read content
     * @param {string} UID ID that has to be used.
     */
    read: uid => store.readContent(type, uid),

    /**
     * Read content snapshot.
     * @param {Function} SetterFunction Function to run with data
     * @param {string} UID ID that has to be used.
     */
    readSnap: (fn, uid) => store.readContentSnapshot(type, fn, uid),

    /**
     * Create content
     * @param {string} UID optional ID that has to be used.
     * @param {string} Key Item to be updated.
     * @param {Object} Payload the data that is to be stored.
     */
    update: (uid, key, payload = undefined) =>
      store.updateContent(type, uid, key, payload),

    /**
     * Create content
     * @param {string} UID optional ID that has to be used.
     * @param {string} Key Item to be updated.
     */
    delete: (uid, key) => store.deleteContent(type, uid, key),
  }
}

export default crud
