const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
const update = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

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
  // const [result] = books.splice(index, 1);
  const newContactList = [...removedList];

  await update(newContactList);
  return newContactList;
};

const addContact = async (body) => {
  const response = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  response.push(newContact);

  await update(response);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const response = await listContacts();
  const { name, email, phone } = body;
  const index = response.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  response[index] = {
    contactId,
    name,
    email,
    phone,
  };

  await update(response);
  return response[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
