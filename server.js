const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');

const port = 8080;

const typeDefs = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const resolvers = require('./resolvers');
const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();
// app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
        apiKey: process.env.API_KEY
    }
});

server.applyMiddleware({ app });

app.listen(port, () => console.info(`Server started on port ${port}`));
