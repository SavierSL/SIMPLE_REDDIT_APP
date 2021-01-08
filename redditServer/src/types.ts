import { Request, Response } from "express";
import { Redis } from "ioredis";
import { RelationIdMetadataArgs } from "typeorm/metadata-args/RelationIdMetadataArgs";

export type MyContext = {
  req: Request;
  redis: RelationIdMetadataArgs;
  res: Response;
};
