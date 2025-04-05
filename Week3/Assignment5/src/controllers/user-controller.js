import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
  findCatsByUserId,
} from "../models/user-model.js";

const getUser = async (_, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);
  if (cats) {
    res.json(cats);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({ message: "New User added.", result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  console.log(req.body);
  const result = await modifyUser(req.body, req.params.id);
  if (result.user_id) {
    res.status(200);
    res.json({ message: "User successfully updated.", result });
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  if (result.user_id) {
    res.status(200);
    res.json({ message: "User successfully deleted.", result });
  } else {
    res.sendStatus(400);
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser, getCatsByUserId };
