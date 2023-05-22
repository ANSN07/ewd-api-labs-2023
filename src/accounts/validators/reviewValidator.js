import Joi from 'joi';

const nameValidation = (value, helpers) => {
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return helpers.message('Author name should not contain invalid characters');
  }
  if (value.length > 30) {
    return helpers.message('Name too long');
  }
  if (value.length < 1) {
    return helpers.message('Name should contain atleast 1 character');
  }
  return value;
};

const reviewTextValidation = (value, helpers) => {
  if (value.length < 10) {
    return helpers.message('Review too short');
  }
  return value;
};

const ratingValidation = (value, helpers) => {
  if (![1, 2, 3, 4, 5].includes(value)) {
    return helpers.message('Invalid rating value');
  }
  return value;
};

const reviewSchema = Joi.object({
  movieId: Joi.number().required(),
  author: Joi.string().required().custom(nameValidation),
  review: Joi.string().required().custom(reviewTextValidation),
  rating: Joi.number().required().custom(ratingValidation)
});

export default { review: reviewSchema };
