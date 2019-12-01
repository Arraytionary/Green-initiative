import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Container, Root } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import Roboto_medium from 'native-base/Fonts/Roboto_medium.ttf';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
import _ from 'lodash';

// >>>>>>> origin/master

import MainNavigators from './navigation/AppNavigation';
// eslint-disable-next-line camelcase
{
  /* <<<<<<< HEAD */
}
{
  /* import Roboto_medium from 'native-base/Fonts/Roboto_medium.ttf'; */
}
{
  /* // import Constants from 'expo-constants'; */
}
{
  /* // import firebaseAdmin from 'firebase-admin' */
}
{
  /*= ====== */
}

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
    Roboto_medium,
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

  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  return (
    <Root>
      <Container>
        <MainNavigators />
      </Container>
    </Root>
  );
}
