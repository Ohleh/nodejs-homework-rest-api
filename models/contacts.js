const { Schema, model } = require("mongoose");
const Joi = require("joi");

// створили схему
const contactsSchema = new Schema(
  {
    name: {
      type: String,
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
      ref: "users",
    },
  },
  { versionkey: false, timestamps: true }
  // час створення та час останнього оновлення
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schema = {
  addSchema,
  updateFavoriteSchema,
};

// створюємо модель (викликаємо функцію модел)
const Contact = model("contact", contactsSchema);

module.exports = { Contact, schema };
