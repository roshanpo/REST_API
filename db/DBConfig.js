require("dotenv").config();

const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DBCONNLINK,
  ssl: {
      rejectUnauthorized: false
  }
})


module.exports = pool;