import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createContactValidation,
  getContactValidation,
} from "../validation/contact-validation";
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

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
  if (!contact) {
    throw new ResponseError(404, "Contact Not Found");
  }
  return contact;
};

export default {
  create,
  get,
};
