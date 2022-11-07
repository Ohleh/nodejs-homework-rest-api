const Contact = require("../../models/contacts");

// const contactsList = require("../../models/contacts");

const getAll = async (_, res) => {
  try {
    const AllContacts = await Contact.find({});
    // показати конктерні поля name phone
    // const AllContacts = await Contact.find({}, "name phone");
    // окрім полів -name -email
    // const AllContacts = await Contact.find({}, "-name -email");
    res.status(200).json(AllContacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    //  або
    //  catch (e) {
    //  console.error(e);
    //  next(e);
    // }
  }
};

module.exports = getAll;
