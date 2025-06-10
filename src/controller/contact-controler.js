import contactService from "../service/contact-service";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = contactService.create(user, request);
    req.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};
