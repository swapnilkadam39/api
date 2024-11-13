import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./schemas/resolvers.js";
import auth from "./auth/auth.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    let token = req.headers?.authorization;
    let user = token ? auth.validateToken(token) : null;
    return {
      user: user?.data,
    };
  },
  cors: {
    origin: "https://yourfrontend.com", // Allow specific origin
    credentials: true, // Allow cookies to be sent
  },
});
console.log(`🚀 Server ready at ${url}`);
