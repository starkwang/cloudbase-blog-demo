const cloudbase = require('@cloudbase/node-sdk')
const config = require('../config/secrets')
const app = cloudbase.init(config)
export const db = app.database()
