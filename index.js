const { createTable, deleteTable } = require('./src/table');
const { instance } = require('./src/database');

module.exports = { createTable, deleteTable, instance };