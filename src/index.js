const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin')
const serviceAccount = require('./config/serviceAccountKey.json')

const auth = require('./routes/auth')
const users = require('./routes/users')

const app = express()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.use(cors())
app.use(bodyparser.json)

app.use('api/auth', auth)
// app.use('api/users', users)

const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
  console.log(`Listen Port: ${PORT}`)
})