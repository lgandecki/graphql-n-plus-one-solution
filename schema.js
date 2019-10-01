const { gql } = require("apollo-server");

const typeDefs = gql`
  type School {
    name: String
    students: [Student!]!
  }

  type Student {
    id: ID
    name: String
  }

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


exports.getStudentsNameBatched = ids => {
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
    name: (student, _, {studentLoader}) => studentLoader.load(student.id)
  }
};

exports.getStudentsNameBatchedCounter = () => getStudentsNameBatchedCounter;

exports.schema = {
  resolvers,
  typeDefs
};
