import Joi from "joi";

const createAddressValidation = Joi.object({
  street: Joi.string().optional().max(255),
  city: Joi.string().optional().max(255),
  province: Joi.string().optional().max(255),
  country: Joi.string().required().max(100),
  postalCode: Joi.string().required().max(20),
});

export { createAddressValidation };
