const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUserSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
});

const updateSubscriptionSchema = joi.object({
  subscription: joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = joi.object({
  email: joi.string().required().messages({
    "any.required": `Missing required field email`,
  }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};
