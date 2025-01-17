const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { string } = require("joi");

// const { handleSaveErrors } = require("../helpers");

const usersSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: [true, "Set name for user"],
    // },
    password: {
      type: String,
      required: [true, "Set password for user"],
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
      default: "",
    },
    verify: {
      // чи є емейл верифікований
      type: Boolean,
      default: false,
    },
    verificationToken: {
      // токен вариф. який будемо відправляти на пошту і зберігати
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionkey: false, timestamps: true },
  { __v: 0 }
);

// usersSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const verifyEmailShema = Joi.object({
  email: Joi.string().required(),
});

const subscriptionSchema = Joi.object().keys({
  type: Joi.string().valid("starter", "pro", "business"),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailShema,
};

const Users = model("users", usersSchema);

module.exports = { Users, schemas };
