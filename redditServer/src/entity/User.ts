import { IsEmail, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Post } from "./Post";

@ObjectType()
@Entity("users") //decorators
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: String, unique: true })
  @Length(1, 255)
  username: string;

  @Field()
  @Column({ type: String })
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Column({ type: String, nullable: false })
  @Length(1, 255)
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column({ type: "uuid" })
  uuid: string;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  //   @Column({
  //     type: "enum",
  //     enum: ["user", "admin"],
  //     default: "user";
  //   })
  //    @isEnum(["user", "admin", undefined])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
