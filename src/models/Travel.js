const admin = require('../config/firebase');
const firestore = admin.firestore();

class Travel {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }

  static async getTravels(origin, destination, date) {
    try {
      const travelsRef = firestore.collection('travels');
      let query = travelsRef;

      if (origin) query = query.where('origin', '==', origin);
      if (destination) query = query.where('destination', '==', destination);
      if (date) query = query.where('date', '==', date);

      const snapshot = await query.get();
      const travels = [];
      snapshot.forEach(doc => {
        travels.push(new Travel(doc.id, doc.data()));
      });

      return travels;
    } catch (error) {
      throw new Error('Error fetching travels');
    }
  }

  static async addTravel(travelData) {
    try {
      const travel = firestore.collection('travels').doc();
      await travel.set(travelData);
      return new Travel(travel.id, travelData);
    } catch (error) {
      throw new Error('Error adding travel');
    }
  }
}

module.exports = Travel;
