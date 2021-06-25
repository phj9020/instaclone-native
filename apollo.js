import { ApolloClient,InMemoryCache, makeVar, createHttpLink} from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setContext} from '@apollo/client/link/context';
import {offsetLimitPagination} from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';

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

const httpLink = createHttpLink({
    uri:'http://913452c165a3.ngrok.io/graphql'
});

// use createUploadLink
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

const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(uploadHttpLink),
    cache: cache,
});

export default client;