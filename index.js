const { ApolloServer } = require("apollo-server");
const { createStudentLoader } = require("./dataLoader");
const { schema } = require("./schema");
const server = new ApolloServer({
  ...schema,
  context: () => ({
    studentLoader: createStudentLoader()
  })
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
