import { mergeTypeDefs } from "@graphql-tools/merge";

import usersTypeDefs from "./users/typeDefs.js";
import rolesTypeDefs from "./roles/typeDefs.js";

const typeDefs = mergeTypeDefs([usersTypeDefs, rolesTypeDefs]);

export default typeDefs;
