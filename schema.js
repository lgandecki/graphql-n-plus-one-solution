const { gql } = require("apollo-server");
const DataLoader = require("dataloader");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type School {
    name: String
    students: [Student!]!
  }

  type Student {
    id: ID
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    GetSchoolById(id: ID): School
  }
`;

const schools = [
  {
    id: "1",
    name: "High School",
    studentIds: ["1", "2", "3", "4"]
  }
];

const students = [
  {
    id: "1",
    name: "Bob"
  },
  {
    id: "2",
    name: "Alice"
  },
  {
    id: "3",
    name: "Eve"
  },
  {
    id: "4",
    name: "Nancy"
  }
];

let getStudentsNameBatchedCounter = 0;

const studentLoader = new DataLoader(keys => getStudentsNameBatched(keys));

const getStudentsNameBatched = ids => {
  getStudentsNameBatchedCounter++;
  return new Promise(resolve => resolve(ids.map(getStudentName)));
};

const getStudentName = id => {
  return new Promise(resolve => {
    resolve(students.find(student => student.id === id).name);
  });
};

const resolvers = {
  Query: {
    GetSchoolById: (_, { id }) => {
      return schools.find(school => school.id === id);
    }
  },
  School: {
    students: school => {
      return school.studentIds.map(id => ({
        id
      }));
    }
  },
  Student: {
    name: student => studentLoader.load(student.id)
  }
};

exports.getStudentsNameBatchedCounter = () => getStudentsNameBatchedCounter;

exports.schema = {
  resolvers,
  typeDefs
};
