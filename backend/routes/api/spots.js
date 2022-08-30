// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
});

// Get all Spots owned by the Current User

// Get details of a Spot from an id

// Create a Spot

// Add an Image to a Spot based on the Spot's id

// Edit a Spot

// Delete a Spot

//


module.exports = router;
