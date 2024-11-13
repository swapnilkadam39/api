import roles from "../roles/role.js";

const rolesResolvers = {
  Query: {
    roles: async (_, args, req) => await roles.getRoles(req),
    roleById: async (_, { id }, req) => await roles.getRole(req, id),
  },
  Mutation: {
    createRole: async (_, { input }, req) => await roles.createRole(req, input),
    updateRole: async (_, { input }, req) => await roles.updateRole(req, input),
  },
};

export default rolesResolvers;
