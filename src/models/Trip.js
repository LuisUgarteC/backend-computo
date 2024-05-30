const admin = require('../config/firebase')
const firestore = admin.firestore()

class Trip {
  constructor(userEmail, seats, travelId) {
    this.userEmail = userEmail;
    this.seats = seats; // arreglo: label, nombre, tipo
    this.travelId = travelId; // Añadir travelId para identificar el viaje
  }

  static async createTrip(userEmail, seats, travelId) {
    try {
      const trip = firestore.collection('trips').doc();
      await trip.set({
        userEmail,
        seats,
        travelId // Guardar travelId
      });
      return new Trip(userEmail, seats, travelId);
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error creating trip');
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
