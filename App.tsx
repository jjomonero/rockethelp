import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { THEME } from './src/styles/theme';
import { Home } from './src/screens/Home';
import { Register } from './src/screens/Register';
import { Routes } from './src/routes';
import { CameraPage } from './src/screens/CameraPage';

export default function App() {
  const [ fontsLoaded] = useFonts({ 
    Roboto_400Regular, 
    Roboto_700Bold
  })
  return (
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          backgroundColor='transparent'
          barStyle='light-content'
          translucent
        />
       { fontsLoaded ? <Routes /> : <Loading/>}
      </NativeBaseProvider>
    )
}

