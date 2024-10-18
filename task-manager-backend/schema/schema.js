const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    userId: Int!
  }

  type Query {
    users: [User]
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    register(username: String!, password: String!): String
    login(username: String!, password: String!): String
    createTask(title: String!, description: String): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): String
  }
`);

module.exports = schema;
