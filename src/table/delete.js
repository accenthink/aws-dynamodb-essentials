// Deletes the given table by its name.
const { instance } = require("../database/index.js");

module.exports.deleteTable =  async (tableName, options) => {
    console.log(`DELETE TABLE :: Try to delete table ${tableName}.`);

    const dynamodb = instance(options);
    const params = { TableName : tableName };

    return await new Promise((resolve, reject) => {
        dynamodb.deleteTable(params, (err, data) => {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
                reject(`ERROR :: ${err.message}`);
            } else {
                console.log("deleteTable. Table description JSON:", JSON.stringify(data, null, 2));
                resolve(`SUCCESS :: Table ${params.TableName} deleted.`);
            }
        });
    });
}