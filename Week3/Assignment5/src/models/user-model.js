import bcrypt from "bcrypt";
import promisePool from "../utils/database.js";

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  console.log("rows", rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findCatsByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT wsk_cats.*, wsk_users.name FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_cats.owner = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  const { name, username, email, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password)
               VALUES (?, ?, ?, ?)`;
  const params = [name, username, email, password];
  const rows = await promisePool.execute(sql, params);
  console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { user_id: rows[0].insertId };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    +id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: "success", user_id: id };
};

const removeUser = async (id) => {
  const conn = await promisePool.getConnection();

  await conn.beginTransaction();
  await promisePool.execute("DELETE FROM wsk_cats WHERE owner = ?", [id]);

  const [rows] = await promisePool.execute(
    "DELETE FROM wsk_users WHERE user_id = ?",
    [id]
  );

  console.log("rows", rows);
  if (rows.affectedRows === 0) {
    return false;
  }

  await conn.commit();

  return { message: "success", user_id: id };
};

export {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  findCatsByUserId,
};
