import AppLoading from 'expo-app-loading';
import React, {useState} from 'react';
import {Ionicons} from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutNavigator from './navigators/LoggedOutNavigator';


export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  const preload = () => {
    // font icons to load
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map(font => Font.loadAsync(font));

    // image assets to load
    const imagesToLoad = [require("./assets/logo.png"), "https://upload.wikimedia.org/wikipedia/commons/2/2a/Instagram_logo.svg"];
    const imagePromise = imagesToLoad.map(image => Asset.loadAsync(image));

    return Promise.all([...fontPromise, ...imagePromise]);
  };

  if(loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />
  };

  return (
    <NavigationContainer>
      <LoggedOutNavigator /> 
    </NavigationContainer>
  )
}


