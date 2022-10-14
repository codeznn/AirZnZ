// backend/routes/api/spotIamges.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const deadImage = await SpotImage.findByPk(req.params.imageId);

    if(!deadImage) {
        res.status(404);
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    };
    const spot = await Spot.findByPk(deadImage.toJSON().spotId)
    if (spot.toJSON().ownerId !== req.user.id) {
        return res.status(403).json({
            "message": "Spot Image not belong to current user",
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
