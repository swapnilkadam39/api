const usersTypeDefs = `#graphql
  type Role {
    id: ID!
    name: String!
    description: String!
    created_at: String!
    updated_at: String!
    user_id: String!
  }
  
  type User {
    id: ID!
    name: String!
    mobile: String!
    email: String!
    gender: String!
    role: Role!
    created_at: String!
    updated_at: String!
    is_active: Boolean!
    auth_token: String
  }
  
  type Query {
    users: [User!]
    userById(id:ID!):User
    usersByRole(roleName: String!): [User!]
  }
  input CreateUserInput {
    name: String!
    mobile: String!
    email: String!
    gender: String!
    password: String!
  }
  type Mutation {
    login(email: String!, password: String!):User
    signUp(input: CreateUserInput!):User
  }
`;

export default usersTypeDefs;
