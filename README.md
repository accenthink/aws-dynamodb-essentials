# aws-dynamodb-essentials

## What is this module for?
The claim is to provide an easy-to-use abstraction layer for using AWS DynamoDB. Provides basic functionality to effectively leverage AWS DynamoDB and avoid code redundancy.

### Why did I create this module?
The main reason for this is that I am building a backend that consists of different AWS Lambda functions. These lambdas manage their DynamoDB tables themselves. It quickly became apparent that there was a lot of duplicated code for this. To reduce this boilerplate, I came up with the idea of building a library that encapsulates these recurring functions and is reusable.
Maybe it will be useful for you in your project. In the following I will show some simple use cases.

## Documentation

### Local Development
For local development on the developer machine, so if DynamoDB is running in a Docker container, the AWS_REGION must be set to 'localhost'. The host is usually: http://localhost:8000

```javascript
const dbOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
};
```

### Get an Instance
Optional Parameters:
* Options (object, i.e. { region: "eu-west-3"} )

```javascript
const { instance } = require('aws-dynamodb-essentials');
const dynamodb = instance();

instance.putItem(params, (error, data) => {
    ...
});
```

### Create a Table

Required Parameters:
* Table name (String)
* Partition key (String, i.e. "ID")

Optional Parameters:
* Attribute Type of the PK (i.e. "S", if not set, default is "S")
* Options (object, i.e. { region: "eu-west-3"} )

#### Example:
```javascript
const { createTable } = require('aws-dynamodb-essentials');
await createTable("my-table", "id", "S", dbOptions);
```

### Delete a Table

Required Parameters:
* Table name (String)

Optional Parameters:
* Options (object, i.e. { region: "eu-west-3"} )

#### Example:
```javascript
const { deleteTable } = require('aws-dynamodb-essentials');
await deleteTable("my-table", dbOptions);
```