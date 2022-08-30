// backend/routes/api/spots.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// Get all Spots owned by the Current User
router.get('/current', async (res, req) => {

})

// Get details of a Spot from an id

// Create a Spot

// Add an Image to a Spot based on the Spot's id

// Edit a Spot

// Delete a Spot

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: {
            model: SpotImage, 
            where: { preview: true },
            attributes: ["url"],
            },

    })

    // // aveRating ( method: sum / count)
    // // const spotsArr = []
    // // for (let i = 0; i < spots.length; i++) {
    // //     const currentSpot = spots[i].toJSON();
    // //     // console.log(currentSpot)
    // //     console.log(currentSpot.id)
    // //     const sumStar = await Review.sum('stars', {
    // //         where: { spotId: currentSpot.id },
    // //     });
    // //     console.log(sumStar)

    // //     const countStar = await Review.count('stars', {
    // //         where: { spotId: currentSpot.id },
    // //     })
    // //     console.log(countStar)

    // //     if (sumStar && countStar) {
    // //         currentSpot.aveRating = sumStar / countStar;
    // //         spotsArr.push(currentSpot)
    // //     }
    // //     // console.log(currentSpot)
    // // }
    // // aveRating ( method: sequelize + fn)
    // const spots = await Spot.findAll()

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

    res.json({"Spots": spots})
});


module.exports = router;
