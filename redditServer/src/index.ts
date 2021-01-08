import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import express, { Request, Response } from "express";
import { Post } from "./entity/Post";
import { validate } from "class-validator";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/Users";

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false, //for
    }),
    // context: () => ({})
  });
  //server
  const app = express();
  apolloServer.applyMiddleware({ app });

  // app.get("/", async (_, res) => {
  //   res.json("hello");
  // });
  createConnection()
    .then(async () => {
      app.listen(5001, () => {
        console.log(`server is up at port 5001`);
      });
    })
    .catch((error) => console.log(error));
};

main();
