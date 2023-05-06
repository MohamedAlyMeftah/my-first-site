const Joi = require("@hapi/joi");

export default {
  checkId: Joi.object().keys({
    id: Joi.string().required(),
  }),

  checkBody: Joi.object().keys({
    Title: Joi.string().required(),

    Description: Joi.string().required(),

    Status: Joi.string().valid("Completed", "Not Completed"),
  }),

  CheckUpdate: Joi.object().keys({
    Title: Joi.string().required(),

    Description: Joi.string().required(),

    Status: Joi.string().valid("Completed", "Not Completed"),
  }),
};

//6452719a2c4717b3cc84bd21
