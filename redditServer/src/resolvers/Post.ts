import "reflect-metadata";
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Ctx,
  Arg,
  Mutation,
} from "type-graphql";
import { Post } from "../entity/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }
  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("body") body: string
  ): Promise<Post> {
    return Post.create({ title, body }).save();
  }
  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("body") body: string
  ): Promise<Post> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    post.title = title || post.title;
    post.body = body || post.body;
    await post.save();
    return post;
    // if (typeof title !== "undefined") {
    //   await Post.update({ id }, { title, body });
    // }
    // return post;
  }
  @Mutation(() => String)
  async deletePost(@Arg("id") id: number): Promise<String> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    await post.remove();
    return "Deleted";
  }
}
