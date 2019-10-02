const clientTable = `CREATE TABLE 
IF NOT EXISTS client
(
id serial primary key,
clientName varchar,
mobileNo varchar
)`;
const questionTable = `CREATE TABLE IF NOT EXISTS question
(
    id serial primary key,
    questionType varchar
)`;
const questionSubTable = `CREATE TABLE IF NOT EXISTS questionsubtype
(
    id serial primary key,
    questionSubType varchar
)`;
const storeTable = `CREATE TABLE IF NOT EXISTS store
(
    id serial primary key,
    storeName varchar
)`;

const reportTable = `CREATE TABLE 
IF NOT EXISTS report
(
client integer REFERENCES client(id),
ticketId varchar primary key,
contactType varchar,
callType varchar,
sourceName varchar,
storeName integer REFERENCES store(id),
questionType integer REFERENCES question(id),
questionSubType integer REFERENCES questionsubtype(id),
dispositionName varchar,
dateCreated varchar
)`;

const singleTable = `CREATE TABLE 
IF NOT EXISTS singlereporttable
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

module.exports = {
  clientTable,
  questionTable,
  questionSubTable,
  reportTable,
  storeTable,
  singleTable
};
