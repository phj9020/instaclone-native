import AppLoading from 'expo-app-loading';
import React, { useState} from 'react';
import {Ionicons} from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutNavigator from './navigators/LoggedOutNavigator';
import { ThemeProvider } from 'styled-components/native';
import {AppearanceProvider, Appearance } from 'react-native-appearance';
import { darkTheme, lightTheme } from './styles';
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { tokenVar, cache } from './apollo';
import {isLoggedInVar} from './apollo';
import LoggedInNavigator from './navigators/LoggedInNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from './apollo';
import { persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist';

export default function App() {
  // hook should be render at top 
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const onFinish = () => setLoading(false);
  
  const preloadAssets = () => {
    // font icons to load
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map(font => Font.loadAsync(font));
  
    // image assets to load
    const imagesToLoad = [require("./assets/logo_white.png"), "https://upload.wikimedia.org/wikipedia/commons/2/2a/Instagram_logo.svg"];
    const imagePromise = imagesToLoad.map(image => Asset.loadAsync(image));
  
    return Promise.all([...fontPromise, ...imagePromise]);
  };

  const preload = async() => {
    // used async to restore token from cache
    // get token to reuse it 
    const token = await AsyncStorage.getItem(TOKEN);
    if(token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    });
    return preloadAssets();
  };

  if(loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />
  };

  const subscription = Appearance.addChangeListener(({colorScheme}) => {
    console.log(colorScheme);

    if(colorScheme === 'light') {
      setIsDark(false);
    } else if(colorScheme === 'dark'){
      setIsDark(true);
    }
    
  });
  
  console.log(isDark);
  return ( 
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark? darkTheme : lightTheme}>
        <AppearanceProvider>
          <NavigationContainer>
            {isLoggedIn ? <LoggedInNavigator /> : <LoggedOutNavigator /> }
          </NavigationContainer>
        </AppearanceProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}


