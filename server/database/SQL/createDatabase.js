const mysql = require('mysql2/promise');
const { development } = require('../config/config');

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: development.host,
      user: development.username,
      password: development.password,
    });

    await connection.query(`DROP DATABASE IF EXISTS ${development.database};`);

    await connection.query(`CREATE DATABASE ${development.database};`);

    console.log(`Database '${development.database}' recreated successfully.`);
    connection.close();
  } catch (error) {
    console.error(`Error recreating the database: ${error.message}`);
  }
};

createDatabase();