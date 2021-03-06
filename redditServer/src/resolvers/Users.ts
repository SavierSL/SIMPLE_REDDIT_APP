import "reflect-metadata";
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { MyContext } from "../types";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne({ id: req.session.userId });
    return user;
  }
  @Mutation(() => User, { nullable: true })
  async registerUser(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<User | String | undefined> {
    const user = await User.find({ email });
    const user1 = await User.find({ username });
    if (user.length !== 0) {
      throw new Error("Email is already in use");
    }
    if (user1.length !== 0) {
      throw new Error(`Username is already in use`);
    }
    if (password.length < 5) {
      throw new Error(`Password is required`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    console.log(user);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPass,
    }).save();
    req.session.userId = newUser.id;
    return newUser;
  }
  @Mutation(() => User)
  async logInUser(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Wrong username");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Wrong password bro! lol");
    }
    req.session.userId = user.id;

    return user;
  }
}
