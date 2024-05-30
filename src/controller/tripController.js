const Trip = require('../models/Trip')

const createTrip = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { seats, travelId } = req.body;  // Asegurarse de que travelId se extrae del cuerpo de la solicitud
    const newTrip = await Trip.createTrip(userEmail, seats, travelId);
    res.status(201).json({
      message: 'Trip created successfully',
      trip: newTrip
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};


const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.getAllTrips()
    res.json({
      trips,
      message: 'success'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const getTripsByUser = async (req, res) => {
  try {
    const { userEmail } = req.params
    const trips = await Trip.getTripsByUser(userEmail)
    res.json({
      trips,
      message: 'success'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = { createTrip, getAllTrips, getTripsByUser }
