// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function getAllSpots(ownerId) {
    const wherequery = {};
    if(ownerId) {
        wherequery.ownerId = ownerId
    };

    const spots = await Spot.findAll({
        include: {
            model: SpotImage,
            where: { preview: true },
            attributes: ["url"],
            },
        where: wherequery,
    })

    for (let i = 0; i < spots.length; i++) {
        const currentSpot = spots[i].toJSON();
        let aveRating = await Review.findAll({
            where: { spotId: currentSpot.id},
            attributes: [
                [
                    sequelize.fn("AVG", sequelize.col("stars")),
                    "avgRating"
                ]
            ]
        });
        currentSpot.aveRating = aveRating[0].toJSON().avgRating;

        // previewImages
        if (currentSpot.SpotImages.length > 0) {
            currentSpot.previewImages = currentSpot.SpotImages[0].url;
            delete currentSpot.SpotImages;
        } else {
            currentSpot.previewImages = null;
            delete currentSpot.SpotImages;
        }
        spots[i] = currentSpot
    }
    return spots;
}

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userSpots = await getAllSpots(req.user.id);
    res.json({
        Spots: userSpots
    })
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(400);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId},
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] },
        ]
    })
    res.json({
        Reviews: reviews
    })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(400);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if (spot.toJSON().ownerId !== req.user.id) {
        const bookings = await Booking.findAll({
            where: { spotId: req.params.spotId},
            attributes: ['spotId', 'startDate', 'endDate'],
        })
        res.json({
            Bookings: bookings
        })
    } else {
        const bookings = await Booking.findAll({
            where: { spotId: req.params.spotId},
            include:{
                model: User, attributes: ['id', 'firstName', 'lastName']
            },
        })
        res.json({
            Bookings: bookings
        })
    }


})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: SpotImage,
             attributes: ['id', 'url', 'preview']},
            { model: User, as: 'Owner',
             attributes: ['id', 'firstName', 'lastName']}
        ]
    });
    if (spot) {
        const numReviews = await Review.count({
            where: {spotId: req.params.spotId}
        });
        const avgRating = await Review.findAll({
            where: {spotId: req.params.spotId},
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]]
        });

        const currentSpot = spot.toJSON();
        currentSpot.numReviews = numReviews;
        currentSpot.aveStarRating = avgRating[0].toJSON().avgRating;

        res.json(currentSpot)
    } else {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})


// Get all Spots
router.get('/', async (req, res) => {
    const spots = await getAllSpots()

    res.json({"Spots": spots})
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(400);
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        );
    }
    if (spot.toJSON().ownerId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "spot doesn't belong to current user",
            "statusCode": 403
        })
    }

    const spotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url: req.body.url,
        preview: req.body.preview
    })
    res.json(spotImage)
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(400);
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        );
    };

    const userReview = await Review.findOne({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id,
            },
    })
    if (userReview) {
        res.status(403);
        res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    const { review, stars } = req.body;
        try {
            const newReview = await Review.create({
                userId: req.user.id,
                spotId: req.params.spotId,
                review,
                stars,
            })
            res.status(201);
            res.json(newReview)

        } catch(err) {
            res.status(400);
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "review": "Review text is required",
                  "stars": "Stars must be an integer from 1 to 5",
                }
            });
        }

})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(400);
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        );
    };

    const { startDate, endDate } = req.body;
    // const exsitedBooking = await Booking.findAll({
    //     where: {
    //         spotId: req.params.spotId,
    //         },
    // })
    // if (exsitedBooking.) {
    //     res.status(403);
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //     })
    // }

        try {
            const newBooking = await Booking.create({
                spotId: req.params.spotId,
                userId: req.user.id,
                startDate: startDate,
                endDate: endDate,
            })
            res.status(201);
            res.json(newBooking)

        } catch(err) {
            res.status(400);
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "endDate": "endDate cannot be on or before startDate"
                }
            });
        }

})

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.status(400);
        res.json(
            {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "address": "Street address is required",
                  "city": "City is required",
                  "state": "State is required",
                  "country": "Country is required",
                  "lat": "Latitude is not valid",
                  "lng": "Longitude is not valid",
                  "name": "Name must be less than 50 characters",
                  "description": "Description is required",
                  "price": "Price per day is required"
                }
              }
        )
    }

    const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });

    res.json({spot})

})

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.status(400);
        res.json(
            {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "address": "Street address is required",
                  "city": "City is required",
                  "state": "State is required",
                  "country": "Country is required",
                  "lat": "Latitude is not valid",
                  "lng": "Longitude is not valid",
                  "name": "Name must be less than 50 characters",
                  "description": "Description is required",
                  "price": "Price per day is required"
                }
              }
        )
    };

    if (!spot) {
        res.status(400);
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        );
    }

    if (spot.toJSON().ownerId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Spot not belong to current user",
            "statusCode": 403
        })
    }

    await spot.update({
        address, city, state, country, lat, lng, name, description, price
    });

    res.json(spot)


})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const deadSpot = await Spot.findByPk(req.params.spotId);

    if (!deadSpot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (deadSpot.toJSON().ownerId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Spot not belong to current user",
            "statusCode": 403
        })
    }

    await deadSpot.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })


})

module.exports = router;
