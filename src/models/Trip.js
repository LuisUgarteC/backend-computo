const admin = require('../config/firebase')
const firestore = admin.firestore()

class Trip {
  constructor (userEmail, seats) {
    this.userEmail = userEmail
    this.seats = seats // Array of seat objects {label: 'A1', passengerName: 'Juan', passengerType: 'Adulto'}
  }

  static async createTrip (userEmail, seats) {
    try {
      const trip = firestore.collection('trips').doc()
      await trip.set({
        userEmail,
        seats
      })
      return new Trip(userEmail, seats)
    } catch (error) {
      console.log('Error => ', error)
      throw new Error('Error creating trip')
    }
  }

  static async getAllTrips () {
    try {
      const trips = await firestore.collection('trips').get()
      const foundTrips = []
      trips.forEach(doc => {
        foundTrips.push({
          id: doc.id,
          ...doc.data()
        })
      })
      return foundTrips
    } catch (error) {
      throw error
    }
  }

  static async getTripsByUser (userEmail) {
    try {
      const trips = await firestore.collection('trips').where('userEmail', '==', userEmail).get()
      const foundTrips = []
      trips.forEach(doc => {
        foundTrips.push({
          id: doc.id,
          ...doc.data()
        })
      })
      return foundTrips
    } catch (error) {
      throw error
    }
  }
}

module.exports = Trip
