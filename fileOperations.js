const fs = require("fs");

function contentFormatter(content) {
    return content.reduce((acc, curr) => {
        const valuesOfObjectInArrayFormat = Object.values(curr);
        return acc.map((item, idx) =>  item.concat(valuesOfObjectInArrayFormat[idx])
        )
    }, defaultDataContainer(content));
    function defaultDataContainer(content) {
        return Array.from(Array(Object.keys(content[0]).length).keys()).map(_ => [])
    }
}

class ReadFromFile {
    constructor(fileName="interview") {
        this.fileName=fileName;
    }
    readFromFile() {
        const rawContent = fs.readFileSync(__dirname + `/data/${this.fileName}.json`, 'utf-8');
        return JSON.parse(rawContent)[1].Report;
    }
}

class SingleTableFileContentFormatter extends ReadFromFile {
    formatToDbInsertionFormat(){
       const content =  this.readFromFile();
        return contentFormatter(content)
    }
}

class MultiTableFileContentFormatter extends ReadFromFile {
    constructor() {
        super();
        this.clientInsertQuery = `INSERT INTO client
            (clientName,mobileNo) SELECT * FROM UNNEST (
            $1::text[], 
            $2::text[])`;
        this.reportInsertQuery = `INSERT INTO report
            (client, ticketId,
            contactType, callType, sourceName, storeName,questionType,
            questionSubType,dispositionName,dateCreated)  VALUES(
            $1,$2, $3,$4,$5, $6, $7, $8, $9, $10)`;
    }
    formatToDbInsertionFormat() {
        const content = this.readFromFile();
        const [ticketId, clientName, mobileNo, ...rest] = contentFormatter(content);
        const clientDetailsFormat = { data: [clientName, mobileNo], query: this.clientInsertQuery };
        const reportDetails = {data: [ticketId, ...rest]};
        const reportDetailsFormat = clientName.map((client, idx) => {
            return {
                client,
                data: reportDetails.data.map((data) => data[idx]),
                query: this.reportInsertQuery
            }
        });
        return ({ clients: clientDetailsFormat, reports: reportDetailsFormat})
    }
}

module.exports = {
    SingleTableFileContentFormatter,
    MultiTableFileContentFormatter
};
