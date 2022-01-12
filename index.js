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
    configureDatabase();
  }

  return new AWS.DynamoDB();
}

// Creates the table if it still not exists.
module.exports.createTable = async (params, options) => {
    if (options){
      configureDatabase(options);
    }

    const dynamodb = new AWS.DynamoDB();

    return await new Promise((resolve, reject) =>{
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
