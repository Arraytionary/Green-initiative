import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Container, Root } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';

import MainNavigators from './navigation/AppNavigation';

const firebaseConfig = {
  apiKey: 'AIzaSyBaG6tvIeo4IuKf8jVn6-aoeC8YJsoH6SA',
  authDomain: 'the-green-initiative.firebaseapp.com',
  databaseURL: 'https://the-green-initiative.firebaseio.com',
  projectId: 'the-green-initiative',
  storageBucket: 'the-green-initiative.appspot.com',
  messagingSenderId: '558294199922',
  appId: '1:558294199922:web:ac542cc6ff54b621325ceb',
  measurementId: 'G-HTRZYYPXKK',
};

const fetchFonts = () =>
  Font.loadAsync({
    Roboto,
    RobotoMedium,
    ...Ionicons.font,
  });

export default function App() {
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    firebase.initializeApp(firebaseConfig);
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setIsReady(true)} />
    );
  }

  return (
    <Root>
      <Container marginTop={25}>
        <MainNavigators />
      </Container>
    </Root>
  );
}
