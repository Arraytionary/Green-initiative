import { useEffect } from 'react';
import firebase from 'firebase';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
  }, [navigation]);

  return null;
};

export default AuthLoadingScreen;
