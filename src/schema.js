import path from "path";
import {
  makeExecutableSchema,
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
} from "graphql-tools";

const allTypes = loadFilesSync(path.join(__dirname, "/api/v3/**/*.graphql"));
const allResolvers = loadFilesSync(path.join(__dirname, "/api/v3/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
