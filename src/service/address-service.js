import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createAddressValidation,
  getAddressValidation,
} from "../validation/address-validation";
import { getContactValidation } from "../validation/contact-validation";
import { validate } from "../validation/validation";

const checkContactMustExist = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (!totalContactInDatabase) {
    throw new ResponseError(404, "Contact Not Found");
  }

  return contactId;
};
const create = async (user, contactId, request) => {
  contactId = await checkContactMustExist(user, contactId);
  const address = validate(createAddressValidation, request);
  address.contactId = contactId;

  request = validate(createAddressValidation, request);

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = await checkContactMustExist(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contactId: contactId,
      id: addressId,
    },
    data: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
  if (!address) {
    throw new ResponseError(404, "address not found");
  }
};
export default {
  create,
  get,
};
