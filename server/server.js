const express = require('express');
const db = require('./config/connection');

//import apollo server
const { ApolloServer } = require('apollo-server-express');

//import typedefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

//create new apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

//integrate apollo server with express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //log where we can go to test GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
