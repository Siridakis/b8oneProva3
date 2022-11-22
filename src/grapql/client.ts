import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://urchin-app-ikk9z.ondigitalocean.app/graphql",
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});