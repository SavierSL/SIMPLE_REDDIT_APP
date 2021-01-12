import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import {
  Provider,
  createClient,
  cacheExchange,
  dedupExchange,
  fetchExchange,
} from "urql";
// import { cacheExchange } from "@urql/exchange-graphcache";

import theme from "../theme";
import { LogInUserMutation, MeDocument } from "../generated/graphql";

// function betterUpdateQuery<Result, Query>(
//   cache: Cache,
//   qi: QueryInput,
//   result: any,
//   fn: (r: Result, q: Query) => Query
// ) {
//   return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
// }

const client = createClient({
  url: "http://localhost:5001/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
