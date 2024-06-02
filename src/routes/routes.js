const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllUsers } = require('./../controller/userController');
const { createTrip, getAllTrips, getTripsByUser } = require('./../controller/tripController');
const { getTravels, addTravel, getSeats } = require('./../controller/travelController');
const authenticateToken = require('./../auth/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.post('/create-trip', authenticateToken, createTrip);
router.get('/get-all-trips', authenticateToken, getAllTrips);
router.get('/get-trips-by-user/:userEmail', authenticateToken, getTripsByUser);
router.get('/get-travels', authenticateToken, getTravels);
router.post('/add-travel', authenticateToken, addTravel);
router.get('/get-seats', authenticateToken, getSeats);

module.exports = router;



