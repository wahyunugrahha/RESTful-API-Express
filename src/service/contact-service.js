import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
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

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      id: contact.id,
      username: user.username,
    },
  });
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact Not Found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    },
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
  get,
  update,
};
