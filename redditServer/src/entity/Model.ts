// import { Field, Int } from "type-graphql";
// import {
//   BaseEntity,
//   BeforeInsert,
//   Column,
//   CreateDateColumn,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { v4 as uuid } from "uuid";

// export default abstract class Model extends BaseEntity {
//   @Field(() => Int)
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Field(() => String)
//   @Column({ type: "uuid" })
//   uuid: string;

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt: Date;

//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt: Date;

//   @Field(() => String)
//   @BeforeInsert()
//   createUuid() {
//     this.uuid = uuid();
//   }

//   constructor(model?: Partial<any>) {
//     super(); //bc we inherit it fromm class
//     Object.assign(this, model);
//   }
//   toJSON() {
//     return { ...this, id: undefined };
//   }
// }
