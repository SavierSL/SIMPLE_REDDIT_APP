import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<User>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  title: Scalars['String'];
  body: Scalars['String'];
  uuid: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost: Post;
  deletePost: Scalars['String'];
  registerUser?: Maybe<User>;
  logInUser: User;
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLogInUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'id'>
  )> }
);


export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  registerUser(email: $email, username: $username, password: $password) {
    username
    email
    id
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};