import Joi from "joi";

const createContactValidation = Joi.object({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).optional(),
  email: Joi.string().max(255).email().optional(),
  phone: Joi.string().max(255).optional(),
});

const getContactValidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).optional(),
  email: Joi.string().max(255).email().optional(),
  phone: Joi.string().max(255).optional(),
});

const searchContactValidation = Joi.object({
  page: Joi.number().positive().min(1).default(1),
  size: Joi.number().positive().min(1).max(100).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});
export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation
};
