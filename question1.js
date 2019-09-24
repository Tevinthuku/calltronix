

const { SingleTableDb } = require("./db");
const { FileContentFormatter } = require("./fileOperations");

const ab = new SingleTableDb();
const c = new FileContentFormatter();

ab.insertItems(c.formatToDbInsertionFormat());
