// backend/routes/api/bookings.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Get all of the Current User's Bookings

// Get all Bookings for a Spot based on the Spot's id

// Create a Booking from a Spot based on the Spot's id

// Edit a Booking

// Delete a Booking


module.exports = router;
