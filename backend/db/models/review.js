'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, { foreignKey: 'spotId'});
      Review.belongsTo(models.User, { foreignKey: 'userId'});
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', onDelete: 'CASCADE'});
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        moreThanOneChar(review) {
            if (review.length < 1) throw new Error('Review text is required');
        }
    }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isValidate(value) {
          if (value < 1 || value > 5) throw new Error('Stars must be an integer from 1 to 5')
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
