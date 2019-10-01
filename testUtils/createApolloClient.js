const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { SchemaLink } = require("apollo-link-schema");
const { makeExecutableSchema } = require("graphql-tools");
const { schema,  } = require("../schema");
const { createStudentLoader } = require("../dataLoader");

const executableSchema = makeExecutableSchema(schema);

exports.client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: executableSchema,
    context: () => ({
      studentLoader: createStudentLoader()
    })
  })
});
