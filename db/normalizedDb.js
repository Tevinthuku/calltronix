const DbResponse = require("./dbResponse").DbResponse;
const pool = require("./dbInitialization").pool;
const schemas = require("./schema");

class NormalizedDatabase extends DbResponse {
  constructor() {
    super();
    this.pool = pool;
    this.insertData = this.insertData.bind(this);
    this.insertClients = this.insertClients.bind(this);
    this.insertReports = this.insertReports.bind(this);
    this.insertQuestions = this.insertQuestions.bind(this);
    this.insertSubQuestions = this.insertSubQuestions.bind(this);
    this.insertStores = this.insertStores.bind(this);
  }

  static uniqueArray(arr) {
    return [...new Set(arr)];
  }

  async insertData({ data, rawdata }) {
    const clients = await this.insertClients(data);
    const insertQuestions = await this.insertQuestions(data);
    const insertSubQuestions = await this.insertSubQuestions(data);
    const insertStores = await this.insertStores(data);
    setTimeout(() => {
      this.insertReports(data, rawdata);
    }, 1000);
  }

  insertClients(data) {
    return this.pool.query(
      `INSERT INTO client
        (clientName,mobileNo) SELECT * FROM UNNEST (
        $1::text[], 
        $2::text[])`,
      [data.clientName, data.mobileNo],
      NormalizedDatabase.handleInsertionResponse
    );
  }

  insertQuestions(data) {
    return this.pool.query(
      `INSERT INTO question
          (questionType) SELECT * FROM UNNEST (
          $1::text[])`,
      [NormalizedDatabase.uniqueArray(data.questionType)],
      NormalizedDatabase.handleInsertionResponse
    );
  }

  insertSubQuestions(data) {
    return this.pool.query(
      `INSERT INTO questionsubtype
            (questionSubType) SELECT * FROM UNNEST (
            $1::text[])`,
      [NormalizedDatabase.uniqueArray(data.questionSubType)],
      NormalizedDatabase.handleInsertionResponse
    );
  }

  insertStores(data) {
    return this.pool.query(
      `INSERT INTO store
            (storeName) SELECT * FROM UNNEST (
            $1::text[])`,
      [NormalizedDatabase.uniqueArray(data.storeName)],
      NormalizedDatabase.handleInsertionResponse
    );
  }
  async insertReports(data, rawdata) {
    const reportInsertQuery = `INSERT INTO report
    (client, ticketId, contactType, 
    callType, sourceName, storeName,questionType,
    questionSubType,dispositionName,dateCreated)   VALUES(
    $1,$2, $3,$4,$5, $6, $7, $8, $9, $10)`;
    await Promise.all(
      [
        "SELECT * FROM client",
        "SELECT * FROM question",
        "SELECT * FROM questionsubtype",
        "SELECT * FROM store"
      ].map(itm => this.pool.query(itm))
    ).then(
      ([
        allClientsquery,
        allQuestionsQuery,
        allSubQuestionsQuery,
        allStoresQuery
      ]) => {
        const allClientsList = allClientsquery.rows;
        const allQuestionsList = allQuestionsQuery.rows;
        const allSubQuestionsList = allSubQuestionsQuery.rows;
        const allStoresList = allStoresQuery.rows;

        const newData = rawdata
          .map(data => ({
            client: allClientsList.find(
              ({ clientname }) => clientname === data.clientName
            ).id,
            ticketId: data.ticketID,
            contactType: data.contactType,
            callType: data.callType,
            sourceName: data.sourceName,
            storeName: allStoresList.find(s => s.storename === data.storeName)
              .id,
            questionType: allQuestionsList.find(
              q => q.questiontype === data.questionType
            ).id,
            questionSubType: allSubQuestionsList.find(
              q => q.questionsubtype === data.questionSubType
            ).id,
            dispositionName: data.dispositionName,
            dateCreated: data.dateCreated
          }))
          .map(Object.values)
          .map(data => {
            return this.pool.query(reportInsertQuery, data);
          });
      }
    );
  }
}

module.exports = {
  NormalizedDatabase
};
