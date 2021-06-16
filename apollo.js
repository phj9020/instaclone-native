import { ApolloClient,InMemoryCache, makeVar, createHttpLink} from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setContext} from '@apollo/client/link/context';
import {offsetLimitPagination} from "@apollo/client/utilities";

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

// token을 헤더에 더하기 위해 
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query : {
                fields: {
                    // Method 1 : offsetLimitPagination
                    // seeFeed: offsetLimitPagination()
                    
                    // Method 2 : Configure keyArgs and merge
                    // we dont want apollo to differenciate between query based on argument
                    seeFeed :{
                        keyArgs: false,
                        // merge data
                        merge(existing = [], incoming = []) {
                            return [...existing, ...incoming];
                        },
                    }
                }
            }
        }
    }),
});

export default client;