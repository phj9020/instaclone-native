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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const onFinish = () => setLoading(false);

  const preload = () => {
    // font icons to load
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map(font => Font.loadAsync(font));

    // image assets to load
    const imagesToLoad = [require("./assets/logo_white.png"), "https://upload.wikimedia.org/wikipedia/commons/2/2a/Instagram_logo.svg"];
    const imagePromise = imagesToLoad.map(image => Asset.loadAsync(image));

    return Promise.all([...fontPromise, ...imagePromise]);
  };

  if(loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />
  };

  const subscription = Appearance.addChangeListener(({colorScheme}) => {
    console.log(colorScheme);

    if(colorScheme === 'light') {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
    
  });
  
  console.log(isDark);
  return ( 
      <ThemeProvider theme={isDark? darkTheme : lightTheme}>
        <AppearanceProvider>
          <NavigationContainer>
            <LoggedOutNavigator /> 
          </NavigationContainer>
        </AppearanceProvider>
      </ThemeProvider>
  )
}


