import { Flex, Link, Heading, Box, Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

export interface navBarProps {}

const NavBar: React.FC<navBarProps> = () => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  console.log(data);
  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = <Box>{data.me.username}</Box>;
  }
  return (
    <>
      <Flex bg="tomato" flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </>
  );
};

export default NavBar;
