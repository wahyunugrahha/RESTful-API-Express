import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { createAddressValidation } from "../validation/address-validation";
import { getContactValidation } from "../validation/contact-validation";
import { validate } from "../validation/validation";

const create = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  const address = validate(createAddressValidation, request);
  address.contactId = contactId;

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (!totalContactInDatabase) {
    throw new ResponseError(404, "Contact Not Found");
  }

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

export default {
  create,
};
