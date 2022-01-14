const AWS = require("aws-sdk");

// Necessary to use a local instance of the database.
const configureDatabase = (options) => {
    if(options.isLocal){
      AWS.config.update({
          endpoint: options.endpoint,
          region: 'localhost'
      });
    }
}

module.exports.getInstance = (options) => {
  if (options){
    configureDatabase(options);
  }

  return new AWS.DynamoDB();
}

// Creates the table if it still not exists.
module.exports.createTable = async (params, options) => {
    if (options){
      configureDatabase(options);
    }

    const dynamodb = new AWS.DynamoDB();

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
                resolve(`SUCCESS :: Table ${params.TableName} created.`)
            }
        })
    })
}

// Deletes the given table by its name.
module.exports.deleteTable =  async (tableName, options) => {
    if (options){
      configureDatabase(options);
    }

    const dynamodb = new AWS.DynamoDB();
    const params = { TableName : tableName };

    return await new Promise((resolve, reject) => {
      dynamodb.deleteTable(params, (err, data) => {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
            reject(`ERROR :: ${err.message}`);
        } else {
            console.log("deleteTable. Table description JSON:", JSON.stringify(data, null, 2));
            resolve(`SUCCESS :: Table ${params.TableName} deleted.`)
        }
      });
    }
}
