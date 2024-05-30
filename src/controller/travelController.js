const admin = require('../config/firebase');
const firestore = admin.firestore();

const getTravels = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const travelsRef = firestore.collection('travels');
    const snapshot = await travelsRef.where('date', '==', date).get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const travels = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if ((data.routeType === `${origin}-${destination}` && data.type === 'ida') || 
          (data.routeType === `${destination}-${origin}` && data.type === 'regreso')) {
        travels.push({
          id: doc.id,
          ...data
        });
      }
    });
    res.status(200).json(travels);
  } catch (error) {
    console.error('Error getting travels:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getSeats = async (req, res) => {
  try {
    const { travelId } = req.query;
    const tripSnapshot = await firestore.collection('trips').where('travelId', '==', travelId).get();

    if (tripSnapshot.empty) {
      return res.status(200).json({ seats: [] });
    }

    const seats = [];
    tripSnapshot.forEach(doc => {
      const data = doc.data();
      seats.push(...data.seats);
    });

    res.status(200).json({ seats });
  } catch (error) {
    console.error('Error getting seats:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const addTravel = async (req, res) => {
  try {
    const newTravel = req.body;
    const travelRef = firestore.collection('travels').doc();
    await travelRef.set(newTravel);
    res.status(201).json({ message: 'Travel added successfully' });
  } catch (error) {
    console.error('Error adding travel:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { getTravels, addTravel, getSeats };
