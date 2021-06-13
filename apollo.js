import { ApolloClient,InMemoryCache, makeVar} from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
    uri: 'http://913452c165a3.ngrok.io/graphql',
    cache: new InMemoryCache(),
});

export default client;