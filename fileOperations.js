const fs = require("fs");

function contentFormatter(content) {
  return content.reduce((acc, curr) => {
    const valuesOfObjectInArrayFormat = Object.values(curr);
    return acc.map((item, idx) =>
      item.concat(valuesOfObjectInArrayFormat[idx])
    );
  }, defaultDataContainer(content));
  function defaultDataContainer(content) {
    return Array.from(Array(Object.keys(content[0]).length).keys()).map(
      _ => []
    );
  }
}

class ReadFromFile {
  constructor(fileName = "interview") {
    this.fileName = fileName;
  }
  readFromFile() {
    const rawContent = fs.readFileSync(
      __dirname + `/data/${this.fileName}.json`,
      "utf-8"
    );
    return JSON.parse(rawContent)[1].Report;
  }
}

class SingleTableFileContentFormatter extends ReadFromFile {
  formatToDbInsertionFormat() {
    const content = this.readFromFile();
    return contentFormatter(content);
  }
}

class MultiTableFileContentFormatter extends ReadFromFile {
  formatToDbInsertionFormat() {
    const content = this.readFromFile();
    return {
      data: content.reduce(
        (acc, curr) => {
          const entries = Object.entries(curr);
          let newacc = acc;
          entries.forEach(([key, value]) => {
            newacc = { ...newacc, [key]: acc[key].concat(value) };
          });
          return newacc;
        },
        {
          ticketID: [],
          clientName: [],
          mobileNo: [],
          contactType: [],
          callType: [],
          sourceName: [],
          storeName: [],
          questionType: [],
          questionSubType: [],
          dispositionName: [],
          dateCreated: []
        }
      ),
      rawdata: content
    };
  }
}

module.exports = {
  SingleTableFileContentFormatter,
  MultiTableFileContentFormatter
};
