require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");
const { authenticateUser } = require("./middleware/auth");

const authResolvers = require("./resolvers/authResolvers");
const taskResolvers = require("./resolvers/taskResolvers");

const root = {
  ...authResolvers,
  ...taskResolvers,
};

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true,
    rootValue: root,
    context: {
      user: authenticateUser(req),
    },
  }))
);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
