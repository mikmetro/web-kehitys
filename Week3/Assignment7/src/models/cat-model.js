import promisePool from "../utils/database.js";

const listAllCats = async (owner) => {
  let rows;
  if (owner.role === "admin") {
    [rows] = await promisePool.query(
      "SELECT wsk_cats.*, wsk_users.name as owner_name FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id"
    );
  } else {
    [rows] = await promisePool.query(
      "SELECT wsk_cats.*, wsk_users.name as owner_name FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE owner = ?",
      [owner.user_id]
    );
  }
  console.log("rows", rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT wsk_cats.*, wsk_users.name as owner_name FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE cat_id = ?",
    [id]
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat, owner) => {
  const { cat_name, weight, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { cat_id: rows[0].insertId };
};

const modifyCat = async (cat, id, owner) => {
  let sql;
  if (owner.role === "admin") {
    sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
      cat,
      +id,
    ]);
  } else {
    sql = promisePool.format(
      `UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`,
      [cat, +id, owner.user_id]
    );
  }
  const rows = await promisePool.execute(sql);
  console.log("rows", rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: "success", cat_id: id };
};

const removeCat = async (id, owner) => {
  let rows;
  if (owner.role === "admin") {
    [rows] = await promisePool.execute(
      "DELETE FROM wsk_cats WHERE cat_id = ?",
      [id]
    );
  } else {
    [rows] = await promisePool.execute(
      "DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?",
      [id, owner.user_id]
    );
  }
  console.log("rows", rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return { message: "success", cat_id: id };
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat };
