const rolesTypeDefs = `#graphql
  type Role {
    id: ID!
    name: String!
    description: String!
    created_at: String!
    updated_at: String!
    user_id: String!
  }
  type Query {
    roles: [Role!]
    roleById(id:ID!): Role
  }
  input createRoleInput {
    name: String!
    description: String!
  }
  input updateRoleInput {
    name: String!
    description: String!
    id: ID!
  }
  type Mutation {
    createRole(input: createRoleInput!):Role!
    updateRole(input: updateRoleInput!):Role!
  }
`;

export default rolesTypeDefs;
