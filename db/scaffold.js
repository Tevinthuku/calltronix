const DbResponse = require("./dbResponse").DbResponse;
const pool = require("./dbInitialization").pool;

const schema = require("./schema");

const {
  clientTable,
  questionSubTable,
  questionTable,
  storeTable,
  reportTable,
  singleTable
} = schema;

async function createAllTables() {
  const createIndependent = Promise.all(
    [singleTable, clientTable, questionSubTable, questionTable, storeTable].map(
      table => pool.query(table)
    )
  );

  return createIndependent
    .then(() => pool.query(reportTable))
    .then(() => console.log("Finished creating the tables"));
}

createAllTables();
