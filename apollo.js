import { ApolloClient,InMemoryCache, makeVar, createHttpLink, split} from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setContext} from '@apollo/client/link/context';
import {getMainDefinition, offsetLimitPagination} from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';

export const TOKEN = "token";
export const LOGGEDIN = "loggedIn";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async(token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async() => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar("");
};

// DEPRECATED: not use normal httpLink anymore, use uploadHttpLink instead
const httpLink = createHttpLink({
    uri:'http://913452c165a3.ngrok.io/graphql'
});

// for websocket : subscription 
const wsLink = new WebSocketLink({
    uri: 'ws://913452c165a3.ngrok.io/graphql',
    options: {
        reconnect: true,
        // make connectionParams to function to get called by request or connection
        connectionParams: ()=> ({
            token: tokenVar(),
        }),
    }
});

// use createUploadLink to upload photo
const uploadHttpLink = createUploadLink({
    uri:'http://913452c165a3.ngrok.io/graphql'
});

// token을 헤더에 더하기 위해 
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        }
    }
});

export const cache = new InMemoryCache({
    typePolicies: {
        Query : {
            fields: {
                // Method 1 : offsetLimitPagination
                seeFeed :offsetLimitPagination(),
                searchPhoto: offsetLimitPagination(),
                // seePhotoComments: offsetLimitPagination(),
            }
        }
    }
});

const onErrorLink = onError(({graphQLErrors, networkError}) => {
    if(graphQLErrors) {
        console.log("GraphQL Error", graphQLErrors);
    } 
    if(networkError) {
        console.log("Network Error", networkError);
    }
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

// choose which Link to use depends on wheter using subscription or not  
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLinks,
);


const client = new ApolloClient({
    link: splitLink,
    cache: cache,
});

export default client;