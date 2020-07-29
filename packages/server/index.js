const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const typeDefs = require('./types')
const express = require('express');
const store = require('./store');
const ApolloServer = require('apollo-server-express').ApolloServer

const resolvers = {
  Query,
  Mutation
}

const server = new ApolloServer({ typeDefs, resolvers });
// server.listen({
//   port: 4001
// }).then(({ url }) => {
//   console.log(`🚀  Apollo Server ready at ${url}`);
// });

// For test purposes only, I would not do this in a production app! :)
const app = express()
server.applyMiddleware({ app })
app.use('/reset', (_, res) => {
  store.reset()
  return res.sendStatus(200)
});
app.listen(4000, () => {
  console.log(`[App]: Listening on port ${4000}`)
})