// Placeholder for user model interacting with DynamoDB

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

class User {
  constructor(userId, username, email, passwordHash) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.tableName = "Users"; // DynamoDB table name
  }

  // Added methods for interacting with DynamoDB
  async save() {
    const params = {
      TableName: this.tableName,
      Item: {
        userId: this.userId,
        username: this.username,
        email: this.email,
        passwordHash: this.passwordHash,
      },
    };

    try {
      await dynamoDB.put(params).promise();
      console.log("User saved to DynamoDB");
    } catch (error) {
      console.error("Error saving user to DynamoDB:", error);
      throw error;
    }
  }
}

module.exports = User;
