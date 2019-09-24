

const { SingleTableDb } = require("./db/singleTable");
const { SingleTableFileContentFormatter } = require("./fileOperations");

const singleTableDbObject = new SingleTableDb();
const formatFileContent = new SingleTableFileContentFormatter();

singleTableDbObject.insertItems(formatFileContent.formatToDbInsertionFormat());
