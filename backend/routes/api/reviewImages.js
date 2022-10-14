// backend/routes/api/reviewIamges.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const deadImage = await ReviewImage.findByPk(req.params.imageId);

    if(!deadImage) {
        res.status(404);
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    };
    const review = await Review.findByPk(deadImage.toJSON().reviewId)
    if (review.toJSON().userId !== req.user.id) {
        return res.status(403).json({
            "message": "Review Image not belong to current user",
            "statusCode": 403
        })
    }

    await deadImage.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})








module.exports = router;
