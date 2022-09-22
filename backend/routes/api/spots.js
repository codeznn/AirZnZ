// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { Op } = require("sequelize");
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateQuery = [
    check("page")
      .isInt({ min: 1 }, { max: 10 })
      .optional()
      .withMessage("Page must be greater than or equal to 0"),
    check("size")
      .isInt({ min: 1 }, { max: 20 })
      .optional()
      .withMessage("Size must be greater than or equal to 0"),
    check("minLat")
      .isDecimal()
      .optional()
      .withMessage("Minimum latitude is invalid"),
    check("maxLat")
      .isDecimal()
      .optional()
      .withMessage("Maximum latitude is invalid"),
    check("minLng")
      .isDecimal()
      .optional()
      .withMessage("Minimum longitude is invalid"),
    check("maxLng")
      .isDecimal()
      .optional()
      .withMessage("Maximum longitude is invalid"),
    check("minPrice")
      .isDecimal({ min: 0 })
      .optional()
      .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
      .isDecimal({ min: 0 })
      .optional()
      .withMessage("Maximum price must be greater than or equal to 0"),
  ];

  const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check('lng')
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('name')
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .notEmpty()
      .isDecimal()
      .withMessage('Price should be Decimal'),//'Price per day is required'),
    handleValidationErrors
  ];

  const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ];

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
        currentSpot.avgRating = Number(aveRating[0].toJSON().avgRating).toFixed(1);

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
router.get('/current', requireAuth, async (req, res, next) => {
    const curuserSpots = await getAllSpots(req.user.id);
    res.json({
        Spots: curuserSpots
    })
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
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
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
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
            raw: true,
            nest: true
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
            raw: true,
            nest: true
        })
        res.json({
            Bookings: bookings
        })
    }


})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
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
        currentSpot.avgStarRating = Number(avgRating[0].toJSON().avgRating).toFixed(1);

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
router.get('/', async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    if (!size) { size = 20 };
    if (!page) { page = 1 };

    let pagination = {};
    if (page >= 1 && size >= 1 && page <= 10 && size <= 20) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    } else {
      pagination.limit = 20;
      pagination.offset = 180;
    }

    let queryOptions = [];
      if (minLat) {
        queryOptions.push({
          lat: { [Op.gte]: Number(minLat) },
        });
      }

      if (maxLat) {
        queryOptions.push({
          lat: { [Op.lte]: Number(maxLat) },
        });
      }

      if (minLng) {
        queryOptions.push({
          lng: { [Op.gte]: Number(minLng) },
        });
      }

      if (maxLng) {
        queryOptions.push({
          lat: { [Op.lte]: Number(maxLng) },
        });
      }

      if (minPrice) {
        queryOptions.push({
          price: { [Op.gte]: Number(minPrice) },
        });
      }

      if (maxPrice) {
        queryOptions.push({
          price: { [Op.lte]: Number(maxPrice) },
        });
      };

    let allSpots = await Spot.findAll({
      where: {
        [Op.and]: queryOptions,
      },
       ...pagination
    });

    let spotsArr = []

    for(let i = 0; i< allSpots.length; i++){
      let spotObj = allSpots[i].toJSON();
      let currentId = allSpots[i].id;

      let avgRating = await Review.findByPk(currentId, {
          attributes: [[sequelize.fn('AVG', sequelize.col("stars")), 'avgRating']]
      })
      const rawAvgRating = avgRating.dataValues.avgRating;
      spotObj.avgRating = Number.parseInt(rawAvgRating).toFixed(1);

      const previewImageUrl = await SpotImage.findAll({
          where: { spotId: currentId, preview: true },
          attributes: ['url'],
          limit: 1
      })

      if (previewImageUrl[0]) {
        spotObj.previewImages = previewImageUrl[0].url
      } else {
        spotObj.previewImages = null;
      }

      spotsArr.push(spotObj)
    }


    return res.json({
      Spots: spotsArr,
      page,
      size
    })

  })
// router.get('/', async (req, res, next) => {
//     let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
//     if (page < 0) {
//         res.status(400);
//         res.json({
//             "message": "Validation Error",
//             "statusCode": 400,
//             "page": "Page must be greater than or equal to 0",
//         })
//     };
//     if (size < 0) {
//         res.status(400);
//         res.json({
//             "message": "Validation Error",
//             "statusCode": 400,
//             "size": "Size must be greater than or equal to 0",
//         })
//     }
//     let paginationReal = {}
//     page = parseInt(page);
//     size = parseInt(size);

//     if (!page || isNaN(page)) page = 1;
//     if (!size || isNaN(size)) size = 20;

//     paginationReal.limit = size
//     paginationReal.offset = size * (page - 1)




//     let pagination = { options: [] };
//     if (minLat) {
//         pagination.options.push({
//           lat: { [Op.gte]: Number(minLat) },
//         });
//       }

//       if (maxLat) {
//         pagination.options.push({
//           lat: { [Op.lte]: Number(maxLat) },
//         });
//       }

//       if (minLng) {
//         pagination.options.push({
//           lng: { [Op.gte]: Number(minLng) },
//         });
//       }

//       if (maxLng) {
//         pagination.options.push({
//           lat: { [Op.lte]: Number(maxLng) },
//         });
//       }

//       if (minPrice) {
//         pagination.options.push({
//           price: { [Op.gte]: Number(minPrice) },
//         });
//       }

//       if (maxPrice) {
//         pagination.options.push({
//           price: { [Op.lte]: Number(maxPrice) },
//         });
//       };




//     const spots = await Spot.findAll({
//         where: {
//             [Op.and]: pagination.options,
//         },
//         include: {
//             model: SpotImage,
//             where: { preview: true },
//             attributes: ["url"],
//         },
//         ...paginationReal,
//     })

//     for (let i = 0; i < spots.length; i++) {
//         const currentSpot = spots[i].toJSON();
//         let aveRating = await Review.findAll({
//             where: { spotId: currentSpot.id},
//             attributes: [
//                 [
//                     sequelize.fn("AVG", sequelize.col("stars")),
//                     "avgRating"
//                 ]
//             ]
//         });
//         const temavgRating = aveRating[0].toJSON().avgRating
//         currentSpot.avgRating = Number.parseFloat(temavgRating).toFixed(1);

//         // previewImages
//         if (currentSpot.SpotImages.length > 0) {
//             currentSpot.previewImages = currentSpot.SpotImages[0].url;
//             delete currentSpot.SpotImages;
//         } else {
//             currentSpot.previewImages = null;
//             delete currentSpot.SpotImages;
//         }
//         spots[i] = currentSpot
//     }

//     res.json({
//         "Spots": spots,
//         "page": page,
//         "size": size
//     })
// });

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const currentSpotId = parseInt(req.params.spotId);
    const { url, preview } = req.body
    if (!spot) {
        res.status(400);
        res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        );
    };



    if (spot.toJSON().ownerId === req.user.id) {
        const spotImage = await SpotImage.create({
            spotId: currentSpotId,
            url: url,
            preview: preview
        });
        const newImage = await SpotImage.findOne({
            where: { id: spotImage.toJSON().id},
            attributes: ['id', 'url', 'preview']
        })

        res.json(newImage)
    } else {
        res.status(403);
        res.json({
        "message": "You are not the owner",
        "statusCode": 403
        })
    }
});


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const currentSpotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(currentSpotId)
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
            spotId: currentSpotId,
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
    if (stars < 1 || stars > 5) {
        res.status(400);
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": ["Stars must be an integer from 1 to 5"]
    })

    }
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: currentSpotId,
        review,
        stars,
    });
    // const findNewReview = await Review.findOne({
    //     where: { spotId: currentSpotId }
    // })

    //     res.status(201);
    //     res.json(newReview)

})

// Create a Booking from a Spot based on the Spot's id
function isDateIntersection(start1, end1, start2, end2) {

    if (start1 >= start2 && start1 <= end2) {
        return true;
    }

    if (end1 >= start2 && end1 <= end2) {
        return true;
    }

    if (start1 <= start2 && end1 >= end2) {
        return true;
    }
    return false;
}
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
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

    if (spot.toJSON().ownerId === req.user.id) {
        res.status(403);
        res.json({
            "message": "Spot must NOT belong to the current user",
            "statusCode": 403
        })
    }

    const { startDate, endDate } = req.body;
    if ( endDate < startDate ) {
        return res.status(400)
           .json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
      }

    const exsitedBooking = await Booking.findAll({
        where: {
            spotId: req.params.spotId,
            },
        raw: true,
        nest: true
    })

    const sameBooking = await Booking.findAll({
        where: {spotId: req.params.spotId,
                startDate: new Date(startDate),
                endDate: new Date(endDate)}
    });

    for (let i = 0; i < exsitedBooking.length; i++) {
        let currentBooking = exsitedBooking[i]
        if (sameBooking[0] || isDateIntersection(startDate, endDate, currentBooking.startDate, currentBooking.endDate)) {

            res.status(403);
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }


        const newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate: startDate,
            endDate: endDate,
        })
        res.status(201);
        res.json(newBooking)


});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
    res.status(201);
    res.json(spot)

})

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body

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
router.delete('/:spotId', requireAuth, async (req, res, next) => {
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
