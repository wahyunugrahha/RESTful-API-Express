import { prismaClient } from "../application/database";
import { createContactValidation } from "../validation/contact-validation";
import { validate } from "../validation/validation";

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

export default {
  create,
};
