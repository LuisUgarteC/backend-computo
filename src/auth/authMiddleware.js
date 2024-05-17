const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']
  // console.log('@@ token => ', token)
  // const access = token.split(' ')
  // console.log('@@ token => ', access[1])
  console.log('@@ token => ', token)

  if (!token) {
    // if (access[1]) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  // jwt.verify(access[1], process.env.SECRET, (err, user) => {
  jwt.verify(token, process.env.SECRET, (err, user) => {

    if (err) {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken