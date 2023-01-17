const { Schema, model } = require("mongoose");
const { handleErrorsSchema } = require("../helpers");
const joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleErrorsSchema);

const addContactSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: joi.string().required().email().messages({
    "any.required": `Missing required name field`,
  }),
  phone: joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  favorite: joi.bool(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi
    .bool()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
