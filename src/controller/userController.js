const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const admin = require('./../config/firebase')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const userDoc = await admin.firestore().collection('users').doc(email).get()

    if (!userDoc.exists) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const userData = userDoc.data()

    const isValidPass = await bcrypt.compare(password, userData.password)
    
    if(!isValidPass) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      })
    }

    const token = jwt.sign({ email: userData.email }, process.env.SECRET, { expiresIn: '1h' })
    res.status(200).json({ token })

  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const registerUser = async (req, res) => {
  console.log('@@@ body => ', req.body)

  try {
    const { email, password } = req.body
    console.log('@@@ body => ', email)
    console.log('@@@ pass => ', password)

    const hashed = await bcrypt.hash(password, 10)
    console.log('@@@ hashed => ', hashed)

    await admin.firestore().collection('users').doc(email).set({
      email: email,
      password: hashed
    })

    res.status(201).json({
      message: 'User registered successfully'
    })

  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = { registerUser, loginUser }