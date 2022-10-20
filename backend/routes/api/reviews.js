// backend/routes/api/reviews.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
];



// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
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
            { model: ReviewImage, attributes: ['id', 'url'] },
        ],
        raw: true,
        nest: true
    });
    for (let i = 0; i < reviews.length; i++) {
        const currentReview = reviews[i];
        currentReview.Spot.previewImage = currentReview.Spot.SpotImages.url;
        delete currentReview.Spot.SpotImages;

        reviews[i] = currentReview
    }
    res.json({
        Reviews: reviews
    })
})



// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if(!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };
    if (review.toJSON().userId !== req.user.id) {
        return res.status(403).json({
            "message": "Review not belong to current user",
            "statusCode": 403
        })
    }


    const reviewImages = await ReviewImage.findAll({
        where: {reviewId: req.params.reviewId}
    })

    if (reviewImages.length >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const { url } = req.body
    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: url,
    })

    res.json({
        id: newReviewImage.id,
        url: url
    })

})

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const updateReview = await Review.findByPk(req.params.reviewId)
    if(!updateReview) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };

    if (updateReview.toJSON().userId !== req.user.id) {
        return res.status(403).json({
            "message": "Review not belong to current user",
            "statusCode": 403
        })
    }

    const { review, stars } = req.body;
    console.log(stars)
    if (stars < 1 || stars > 5) {
        res.status(400).json({
            "message": "Stars must be an integer from 1 to 5",
            "statusCode": 400,
        })

    };

    await updateReview.update({
        review: review,
        stars: stars,
    })
    res.json(updateReview)

})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const deadReview = await Review.findByPk(req.params.reviewId)
    if(!deadReview) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };
    if (deadReview.toJSON().userId !== req.user.id) {
        return res.status(403).json({
            "message": "Review not belong to current user",
            "statusCode": 403
        })
    }

    await deadReview.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})











module.exports = router;
