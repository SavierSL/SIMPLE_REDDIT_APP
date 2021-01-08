import "reflect-metadata";
import { Resolver, Query, ObjectType, Field } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }
}
