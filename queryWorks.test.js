const gql = require("graphql-tag");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { SchemaLink } = require("apollo-link-schema");
const { makeExecutableSchema } = require("graphql-tools");
const { schema, getStudentNameCounter } = require("./schema");

const executableSchema = makeExecutableSchema(schema);

const graphqlClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema: executableSchema })
});

test("Gets schools with students", async () => {
  const result = await graphqlClient.query({
    query: gql`
      query GetSchoolById($id: ID) {
        GetSchoolById(id: $id) {
          name
          students {
            id
            name
          }
        }
      }
    `,
    variables: { id: "1" }
  });
  expect(result.data.GetSchoolById).toEqual({
    name: "High School",
    students: [
      {
        id: "1",
        name: "Bob",
        __typename: "Student"
      },
      {
        id: "2",
        name: "Alice",
        __typename: "Student"
      },
      {
        id: "3",
        name: "Eve",
        __typename: "Student"
      },
      {
        id: "4",
        name: "Nancy",
        __typename: "Student"
      }
    ],
    __typename: "School"
  });
});
