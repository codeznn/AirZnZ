// backend/routes/api/bookings.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            { model: Spot,
              attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
              include: {
                model: SpotImage,
                where: {
                    preview: true
                },
                attributes: ['url']
              }
            },
        ],
        // raw: true

    });
    for (let i = 0; i < bookings.length; i++) {
        const currentBooking = bookings[i].toJSON();
        currentBooking.Spot.previewImage = currentBooking.Spot.SpotImages[0].url;
        delete currentBooking.Spot.SpotImages;

        bookings[i] = currentBooking
    }
    res.json({
        Bookings: bookings
    })
})


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const updateBooking = await Booking.findByPk(req.params.bookingId)
    if(!updateBooking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    };

    if (updateBooking.toJSON().endDate < new Date()) {
        res.status(403);
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }

    const { startDate, endDate } = req.body;

    try {
        await updateBooking.update({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate: startDate,
            endDate: endDate,
        })
        res.json(updateBooking)
    } catch(err) {
        res.status(400);
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
        })
    }
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const deadBooking = await Review.findByPk(req.params.bookingId)
    if(!deadBooking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    };
    if (deadBooking.toJSON().startDate < new Date()) {
        res.status(403);
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }

    await deadBooking.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
