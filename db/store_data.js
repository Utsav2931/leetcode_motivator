const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./leetcode_problems.db");

const storeData = async (problemList, type) => {
  await createTables(type)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  await storeProblems(problemList, type)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("Closing db");
  db.close();
};

const storeProblems = async (problemList, type) => {
  let placeholders;

  if (type === "neetcode_all") placeholders = problemList.map((problem) => "(?,?,?,?)").join(",");
  else placeholders = problemList.map((problem) => "(?,?,?,?,?)").join(",");

  const query = `INSERT OR IGNORE INTO ${type} VALUES` + placeholders;
  const convertedList = convertToQuertArgs(problemList);
  console.log(convertedList[0], convertedList.length);

  return new Promise((resolve, reject) => {
    db.run(query, convertedList, function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve(`Rows inserted ${this.changes}`);
      }
    });
  });
};

const convertToQuertArgs = (problemList) => {
  const convertedList = [];
  for (const problem of problemList) {
    convertedList.push(`${problem.problemName}`);
    convertedList.push(`${problem.difficulty}`);
    convertedList.push(`${problem.href}`);
    convertedList.push(0);
    if ("problemType" in problem) {
      convertedList.push(`${problem.problemType}`);
    }
  }
  return convertedList;
};

const createTables = (type) => {
  return new Promise((resolve, reject) => {
    const problemType = type !== "neetcode_all" ? "Type VARCHAR(30)," : "";
    const query = `CREATE TABLE IF NOT EXISTS ${type} 
				(
					ProblemName VARCHAR(255), 
					Difficulty text(10),
					Href VARCHAR(255),
					Solved BOOL,
					${problemType}
					PRIMARY KEY (ProblemName)
				);
			`;

    db.run(query, [], async function (err) {
      if (err) reject(err.message);
      else resolve("Successfully Created table");
    });
  });
};

module.exports = { storeData };
