const DbResponse = require("./dbResponse").DbResponse;
const pool = require("./dbInitialization").pool;

class NormalizedDatabase extends DbResponse{
    constructor() {
        super();
        this.pool = pool;
        this.createTables = this.createTables.bind(this);
        this.insertData = this.insertData.bind(this);
        this.insertClients = this.insertClients.bind(this);
        this.insertReports = this.insertReports.bind(this);
    }
     async createTables() {
         const clientTable = `CREATE TABLE 
            IF NOT EXISTS client
            (
            id serial primary key,
            clientName varchar,
            mobileNo varchar
            )`;
        const reportTable = `CREATE TABLE 
            IF NOT EXISTS report
            (
            client integer REFERENCES client(id),
            ticketId varchar primary key,
            contactType varchar,
            callType varchar,
            sourceName varchar,
            storeName varchar,
            questionType varchar,
            questionSubType varchar,
            dispositionName varchar,
            dateCreated varchar
            )`;
        await this.pool.query(clientTable);
        await this.pool.query(reportTable);
    }

    async insertData({clients, reports}) {
        await this.createTables();
        await this.insertClients(clients);
        await this.insertReports(reports);
    }

    async insertClients({ data, query }) {
        await this.pool.query(query, data, NormalizedDatabase.handleInsertionResponse)
    }

    async insertReports(data) {
        const queryFunction = (name) => ({
            name: 'fetch-client',
            text: 'SELECT id FROM client WHERE clientname = $1',
            values: [name],
        });
        const reportData = data.map((clientdetails) =>
                this.pool.query(queryFunction(clientdetails.client), (err, data) => {
                    const id = data.rows[0].id;
                    const formattedData = [id, ...clientdetails.data];
                    return this.pool.query(clientdetails.query, formattedData, NormalizedDatabase.handleInsertionResponse)
                })
        );
        return await Promise.all(reportData)

    }
}

module.exports = {
    NormalizedDatabase
};
