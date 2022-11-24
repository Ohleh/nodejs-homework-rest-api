const { Contact } = require("../../models/contacts");

// const contactsList = require("../../models/contacts");

const getAll = async (req, res) => {
  // const { __id: usedId } = req.user;
  // const { skip = 0, limit = 0 } = req.query;

  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 2 } = req.query;
    const skip = (page - 1) * limit;
    const AllContacts = await Contact.find(
      { owner },
      "-createdAt, -updatedAt, -__v",
      {
        skip,
        limit,
      }
    ).populate("owner", "name email");

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

// показати конктерні поля name phone
// const AllContacts = await Contact.find({}, "name phone", "-__v");
// окрім полів -name -email, або через .select({__v:0})
// const AllContacts = await Contact.find({}, "-name -email");
// пагінація, показати (5шт) постів з назвою name
// const AllContacts = await Contact.find({}, {name: 1}).limit(5);
// пагінація, пропустити перші 5шт і показати наступні 5шт:
// const AllContacts = await Contact.find({}, {name: 1}).skip(5).limit(5);
// skip можна "0", а можна можна використовувати без limit.
