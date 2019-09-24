const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.POSTGRES_DATABASE_URL
});

module.exports = {
    pool
};
