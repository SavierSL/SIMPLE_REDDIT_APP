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

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import { _prod } from "./_prod";
import cors from "cors";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

const main = async () => {
  //server
  const app = express();
  //reddis
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  //token config
  app.use(
    session({
      name: "qid", //cookie name
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }), // disableTouch forever expiration
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: _prod, //only works in https
        sameSite: "lax", //csrf
      },
      saveUninitialized: false,
      secret: "akoaysixave",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false, //for
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  // app.get("/", async (_, res) => {
  //   res.json("hello");
  // });
  createConnection()
    .then(async () => {
      app.listen(5000, () => {
        console.log(`server is up at port 5000`);
      });
    })
    .catch((error) => console.log(error));
};

main().catch((e) => {
  console.log(e);
});
