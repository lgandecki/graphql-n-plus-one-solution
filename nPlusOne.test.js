const gql = require("graphql-tag");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { SchemaLink } = require("apollo-link-schema");
const { makeExecutableSchema } = require("graphql-tools");
const { schema, getStudentsNameBatchedCounter } = require("./schema");

const executableSchema = makeExecutableSchema(schema);

const graphqlClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema: executableSchema })
});

test("Make sure the getStudentName function gets called only once", async () => {
  const result = await graphqlClient.query({
    query: gql`
      query GetSchoolById($id: ID) {
        GetSchoolById(id: $id) {
          name
          students {
            name
          }
        }
      }
    `,
    variables: { id: "1" }
  });
  expect(getStudentsNameBatchedCounter()).toEqual(1);
});
