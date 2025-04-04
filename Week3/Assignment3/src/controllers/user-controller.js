import { addUser, findUserById, listAllUsers } from "../models/user-model.js";

const getUser = (_, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const cat = findUserById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: "New User added.", result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = (_, res) => {
  res.status(200);
  res.json({ message: "User item updated." });
};

const deleteUser = (_, res) => {
  res.status(200);
  res.json({ message: "User item deleted." });
};

export { getUser, getUserById, postUser, putUser, deleteUser };
