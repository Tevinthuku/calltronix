const DbResponse = require("./dbResponse").DbResponse;
const pool = require("./dbInitialization").pool;

class SingleTableDb extends DbResponse {
  constructor(tableName = "singlereporttable") {
    super();
    this.pool = pool;
    this.tableName = tableName;
    this.insertQuery = `INSERT INTO ${this.tableName} 
            (ticketId,clientName,mobileNo,
            contactType,callType, sourceName, storeName,questionType,
            questionSubType,dispositionName,dateCreated ) SELECT * FROM UNNEST (
            $1::text[], 
            $2::text[], 
            $3::text[],
            $4::text[],
            $5::text[],
            $6::text[],
            $7::text[],
            $8::text[],
            $9::text[],
            $10::text[],
            $11::text[])`;
    this.insertItems = this.insertItems.bind(this);
  }
  async insertItems(data) {
    this.pool.query(
      this.insertQuery,
      data,
      SingleTableDb.handleInsertionResponse
    );
  }
}

module.exports = { SingleTableDb };
