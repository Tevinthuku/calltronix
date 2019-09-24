const DbResponse = require("./dbResponse").DbResponse;
const pool = require("./dbInitialization").pool;

class SingleTableDb extends DbResponse{
    constructor(tableName="singlereporttable") {
        super();
        this.pool = pool;
        this.tableName = tableName;
        this.tableCreationQuery = `CREATE TABLE 
            IF NOT EXISTS ${this.tableName} 
            (
            ticketId varchar primary key,
            clientName varchar,
            mobileNo varchar,
            contactType varchar,
            callType varchar,
            sourceName varchar,
            storeName varchar,
            questionType varchar,
            questionSubType varchar,
            dispositionName varchar,
            dateCreated varchar
            )`;
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
        this.createTableIfDoesntexist = this.createTableIfDoesntexist.bind(this);
        this.insertItems = this.insertItems.bind(this);
    }
     async createTableIfDoesntexist () {
        return await this.pool.query(this.tableCreationQuery);
    };
     async insertItems(data) {
         await this.createTableIfDoesntexist();
         this.pool.query(this.insertQuery,
             data,
             SingleTableDb.handleInsertionResponse)
    }
}

module.exports = { SingleTableDb };
