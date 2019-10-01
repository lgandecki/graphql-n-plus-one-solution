const DataLoader = require("dataloader");
const { getStudentsNameBatched } = require("./schema");

exports.createStudentLoader = () => new DataLoader(keys => getStudentsNameBatched(keys));
