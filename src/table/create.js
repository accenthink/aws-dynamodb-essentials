// Creates the table if it still not exists.
const { instance } = require('../database/index.js');

module.exports.createTable = async (tableName, primaryKey, pkType, options) => {
    console.log(`CREATE TABLE :: Try to delete table ${tableName}.`);

    if (!pkType){
        pkType = "S";
    }

    const dynamodb = instance(options);
    const params = {
        TableName : tableName,
        KeySchema: [
            { AttributeName: primaryKey, KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: primaryKey, AttributeType: pkType },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

    return await new Promise((resolve, reject) => {
        dynamodb.createTable(params, (err, data) => {
            if (err){
                if (err.message === `Table already exists: ${params.TableName}` ||
                    (err.code === "ResourceInUseException" && err.message === "Cannot create preexisting table")){
                    console.debug(`createTable data=${err.message}`);
                    resolve(err.message);
                }else{
                    console.error(err.message);
                    reject(`ERROR :: ${err.message}`);
                }
            }else{
                console.info(`createTable data=${JSON.stringify(data)}`);
                resolve(`SUCCESS :: Table ${params.TableName} created.`);
            }
        })
    })
}
