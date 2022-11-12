const { Schema, model } = require("mongoose");
const Joi = require("joi");

// створили схему
const contactsSchema = new Schema(
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

// ///////////////

// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
// const path = require("path");

// const contactsPath = path.join(__dirname, "contacts.json");
// const update = async (contacts) =>
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// const listContacts = async () => {
//   const response = await fs.readFile(contactsPath, "utf-8");
//   const contacts = JSON.parse(response);
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const response = await listContacts();
//   const contactsById = response.find((el) => el.id === contactId);
//   return contactsById || null;
// };

// const removeContact = async (contactId) => {
//   const response = await listContacts();
//   const findId = response.find((el) => el.id === contactId);
//   if (!findId) return null;

//   const removedList = response.filter((el) => el.id !== contactId);
//   const newContactList = [...removedList];

//   await update(newContactList);
//   return newContactList;
// };

// const addContact = async (body) => {
//   const response = await listContacts();
//   const { name, email, phone } = body;
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   response.push(newContact);

//   await update(response);
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const response = await listContacts();
//   const { name, email, phone } = body;
//   const index = response.findIndex((el) => el.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   response[index] = {
//     id: contactId,
//     name,
//     email,
//     phone,
//   };

//   await update(response);
//   return response[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
