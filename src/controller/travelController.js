const admin = require('../config/firebase')
const firestore = admin.firestore()

const getTravels = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const travelsRef = firestore.collection('travels');
    const snapshot = await travelsRef.where('origin', '==', origin).where('destination', '==', destination).where('date', '==', date).get();
    const travels = [];
    snapshot.forEach(doc => {
      travels.push({ id: doc.id, ...doc.data() });
    });
    const returnSnapshot = await travelsRef.where('origin', '==', destination).where('destination', '==', origin).where('date', '==', date).get();
    returnSnapshot.forEach(doc => {
      travels.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(travels);
  } catch (error) {
    console.error('Error getting travels:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const addTravel = async (req, res) => {
  try {
    const newTravel = req.body;
    const travelRef = firestore.collection('travels').doc();
    await travelRef.set(newTravel);
    res.status(201).json({ message: 'Travel added successfully' });
  } catch (error) {
    console.error('Error adding travel:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getTravels, addTravel };
