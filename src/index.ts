import "reflect-metadata";

import { resolvers } from "@generated/type-graphql";
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initServer = async () => {
  const schema = await buildSchema({
    resolvers,
    validate: false
  });

  const server = new ApolloServer({ schema, context: () => ({ prisma }), introspection: true, persistedQueries: false });

  server.listen({ port: 3000 }).then(r => {
    console.log(`Server ready at ${r.url}`);
  });
}

initServer()
