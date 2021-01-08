import "reflect-metadata";
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

@Resolver()
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async registerUser(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | String | undefined> {
    const user = await User.find({ email });
    const user1 = await User.find({ username });
    if (user.length !== 0) {
      throw new Error("Email is already in use");
    }
    if (user1.length !== 0) {
      throw new Error(`${username} is already in use`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    console.log(user);
    return await User.create({
      username: username,
      email: email,
      password: hashedPass,
    }).save();
  }
  @Mutation(() => User)
  async logInUser(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Wrong username");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Wrong password");
    }
    return user;
  }
}
