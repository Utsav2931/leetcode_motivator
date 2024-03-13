const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./leetcode_problems.db");

const sql = "SELECT * FROM neetcode_150";

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
	console.log(rows.length)
});

db.close();
