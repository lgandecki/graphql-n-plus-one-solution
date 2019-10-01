const gql = require("graphql-tag");
const { client } = require("./testUtils/createApolloClient");
const { getStudentsNameBatchedCounter } = require("./schema");

test("Make sure the getStudentName function gets called only once", async () => {
  const result = await client.query({
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
