import { mergeResolvers } from "@graphql-tools/merge";
import usersResolvers from "./users/resolver.js";
import rolesResolvers from "./roles/resolver.js";

const resolvers = mergeResolvers([usersResolvers, rolesResolvers]);

export default resolvers;
