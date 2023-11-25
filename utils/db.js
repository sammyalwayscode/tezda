// userModel.js
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.MY_AWS_REGION,
  accessKeyId: process.env.MY_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "samtable";

module.exports = {
  async createUser(username, email, password) {
    // DynamoDB put operation to create a new user
    const params = {
      TableName: tableName,
      Item: {
        username: username,
        email: email,
        password: password,
      },
      ConditionExpression: "attribute_not_exists(email)", // Ensures email is unique
    };

    try {
      await dynamoDB.put(params).promise();
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email) {
    // DynamoDB query operation to get a user by email
    const params = {
      TableName: tableName,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    try {
      const data = await dynamoDB.query(params).promise();
      return data.Items[0]; // Assuming email is unique, return the first item
    } catch (error) {
      throw error;
    }
  },
};
