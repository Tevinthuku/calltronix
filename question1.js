

const { SingleTableDb } = require("./db");
const { FileContentFormatter } = require("./fileOperations");

const singleTableDbObject = new SingleTableDb();
const formatFileContent = new FileContentFormatter();

singleTableDbObject.insertItems(formatFileContent.formatToDbInsertionFormat());
