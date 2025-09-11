import joi from 'joi';
import { ProductIdParamSchema } from './commonSchema';

export const AddRatingReviewSchema = joi.object({
  star: joi.number().integer().min(1).max(5).required(),
  review: joi.string().min(3).max(500),
});

export const IdValidationSchema = ProductIdParamSchema;
