import { ApolloClient,InMemoryCache, makeVar} from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN = "token";
export const LOGGEDIN = "loggedIn";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async(token) => {
    await AsyncStorage.multiSet([
        [TOKEN, token],
        [LOGGEDIN, "yes"]
    ]);
    isLoggedInVar(true);
    tokenVar(token);
};

const client = new ApolloClient({
    uri: 'http://913452c165a3.ngrok.io/graphql',
    cache: new InMemoryCache(),
});

export default client;