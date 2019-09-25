const MultiTableFileContentFormatter = require("./fileOperations")
  .MultiTableFileContentFormatter;
const NormalizedDatabase = require("./db/normalizedDb").NormalizedDatabase;

const newDbObject = new NormalizedDatabase();

const fileContentFormatter = new MultiTableFileContentFormatter();
const formattedContents = fileContentFormatter.formatToDbInsertionFormat();
newDbObject.insertData(formattedContents);
