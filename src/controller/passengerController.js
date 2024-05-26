const Passenger = require('../models/Passenger');
const User = require('../models/User');

const savePassengerInfo = async (req, res) => {
  try {
    const { passengers, email } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    for (const passenger of passengers) {
      await Passenger.createPassenger(email, passenger.name, passenger.type, passenger.seat);
    }

    res.status(201).json({
      message: 'Passenger info saved successfully'
    });
  } catch (error) {
    console.log('Error saving passenger info:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

module.exports = { savePassengerInfo };
