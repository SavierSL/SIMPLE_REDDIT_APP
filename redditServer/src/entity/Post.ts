import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";

import { User } from "./User";
import { v4 as uuid } from "uuid";

@ObjectType()
@Entity("posts") //decorators
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field(() => String)
  @Column({ type: "uuid" })
  uuid: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
  toJSON() {
    return { ...this, id: undefined };
  }
}
