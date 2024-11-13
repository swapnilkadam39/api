import users from "./user.js";

const usersResolvers = {
  Query: {
    users: async (_, args, req) => await users.getUsers(req, ""),
    userById: async (_, { id }, req) => await users.getUser(req, id),
    usersByRole: async (_, { roleName }, req) =>
      await users.getUsers(req, roleName),
  },
  Mutation: {
    login: async (_, { email, password }, req) =>
      await users.login(req, email, password),
    signUp: async (_, { input }, req) => await users.createUser(req, input),
  },
};

export default usersResolvers;
