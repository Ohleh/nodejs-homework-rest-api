const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const response = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(response);
  return contacts;
};

const getContactById = async (contactId) => {
  const response = await listContacts();
  const contactsById = response.find((el) => el.id === contactId);
  return contactsById || null;
};

const removeContact = async (contactId) => {
  const response = await listContacts();
  const removedList = response.filter((el) => el.id !== contactId);
  const newContactList = [...removedList];
  const addData = JSON.stringify(newContactList, null, 2);
  return await fs.writeFile(contactsPath, addData, "utf8");
};

const addContact = async (body) => {
  console.log(body);
  const response = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  response.push(newContact);

  const addData = JSON.stringify(response, null, 2);
  await fs.writeFile(contactsPath, addData, "utf8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const response = await listContacts();
  const { name, email, phone } = body;
  const [contactById] = response.filter((el) => el.id === contactId);
  console.log("contactById", contactById);
  contactById.name = name;
  contactById.email = email;
  contactById.phone = phone;
  console.log("contactById", contactById);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
