const admin = require('../config/firebase');
const firestore = admin.firestore();

class Passenger {
  constructor(email, name, type, seat) {
    this.email = email;
    this.name = name;
    this.type = type;
    this.seat = seat;
  }

  static async createPassenger(email, name, type, seat) {
    try {
      const passengerDoc = firestore.collection('passengers').doc();
      await passengerDoc.set({
        email,
        name,
        type,
        seat
      });
      return new Passenger(email, name, type, seat);
    } catch (error) {
      console.log('Error creating passenger:', error);
      throw new Error('Error creating passenger');
    }
  }
}

module.exports = Passenger;
